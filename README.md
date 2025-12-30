# libredwg

基于 LibreDWG WebAssembly 的 TypeScript DWG/DXF 解析库。

## 功能特性

- 读取 AutoCAD DWG 文件（支持多种版本）
- 解析 DWG 文件中的实体、图层、块等信息
- 支持中文字符编码（GBK/GB2312）
- 提供 SVG 转换功能
- 同时支持 ESM 和 CommonJS 模块

## 安装

```bash
npm install libredwg
```

## 使用方法

### 基本用法

```javascript
import { LibreDwg, Dwg_File_Type } from 'libredwg'
import { readFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function readDwg() {
  // 指定 WASM 文件路径
  const wasmPath = join(__dirname, 'node_modules/libredwg/dist/wasm')

  // 创建 LibreDwg 实例
  const dwg = await LibreDwg.create(wasmPath)

  // 读取 DWG 文件
  const buffer = await readFile('example.dwg')
  const dwgData = dwg.dwg_read_data(buffer.buffer, Dwg_File_Type.DWG)

  if (!dwgData) {
    console.error('无法读取 DWG 文件')
    return
  }

  // 获取版本信息
  const version = dwg.dwg_get_version_type(dwgData)
  console.log('DWG 版本:', version)

  // 转换为 DwgDatabase 结构
  const database = dwg.convert(dwgData)

  // 获取图层信息
  console.log('图层列表:')
  for (const layer of database.tables.layers) {
    console.log(`  - ${layer.name}`)
  }

  // 获取实体信息
  const modelSpace = database.tables.blockRecords.find(b => b.name === '*Model_Space')
  if (modelSpace) {
    console.log(`模型空间实体数量: ${modelSpace.entities.length}`)
  }

  // 释放内存
  dwg.dwg_free(dwgData)
}

readDwg()
```

### 转换为 SVG

```javascript
import { LibreDwg, Dwg_File_Type } from 'libredwg'

async function convertToSvg(dwgBuffer) {
  const dwg = await LibreDwg.create(wasmPath)
  const dwgData = dwg.dwg_read_data(dwgBuffer, Dwg_File_Type.DWG)
  const database = dwg.convert(dwgData)

  // 转换为 SVG
  const svg = dwg.dwg_to_svg(database)

  dwg.dwg_free(dwgData)
  return svg
}
```

### 获取缩略图

```javascript
import { LibreDwg, Dwg_File_Type } from 'libredwg'

async function getThumbnail(dwgBuffer) {
  const dwg = await LibreDwg.create(wasmPath)
  const dwgData = dwg.dwg_read_data(dwgBuffer, Dwg_File_Type.DWG)

  // 获取缩略图
  const thumbnail = dwg.dwg_bmp(dwgData)

  dwg.dwg_free(dwgData)
  return thumbnail  // { data: Uint8Array, type: DwgThumbnailImageType }
}
```

## API 说明

### LibreDwg 类

主要类，提供所有 DWG 操作功能。

#### 静态方法

- `create(wasmPath?: string): Promise<LibreDwgEx>` - 创建 LibreDwg 实例

#### 实例方法

- `dwg_read_data(buffer: ArrayBuffer, fileType: number): Dwg_Data_Ptr` - 读取 DWG 文件数据
- `dwg_get_version_type(data: Dwg_Data_Ptr): DwgVersion` - 获取 DWG 版本
- `dwg_get_codepage(data: Dwg_Data_Ptr): DwgCodePage` - 获取代码页
- `dwg_bmp(data: Dwg_Data_Ptr): DwgThumbnail | null` - 获取缩略图
- `convert(data: Dwg_Data_Ptr): DwgDatabase` - 转换为数据库结构
- `dwg_to_svg(data: DwgDatabase): string` - 转换为 SVG
- `dwg_free(data: Dwg_Data_Ptr): void` - 释放内存

### DwgDatabase 结构

```typescript
interface DwgDatabase {
  header: DwgHeader
  classes: DwgClass[]
  tables: {
    layers: DwgLayer[]
    ltypes: DwgLtype[]
    styles: DwgStyle[]
    dimStyles: DwgDimStyle[]
    vports: DwgVport[]
    blockRecords: DwgBlockRecord[]
  }
  objects: DwgObject[]
}
```

### DwgBlockRecord 结构

```typescript
interface DwgBlockRecord {
  name: string
  entities: DwgEntity[]
  // ...
}
```

## 支持的实体类型

- LINE - 直线
- CIRCLE - 圆
- ARC - 圆弧
- ELLIPSE - 椭圆
- LWPOLYLINE - 轻量多段线
- POLYLINE_2D - 二维多段线
- POLYLINE_3D - 三维多段线
- SPLINE - 样条曲线
- TEXT - 单行文字
- MTEXT - 多行文字
- DIMENSION - 标注
- INSERT - 块引用
- HATCH - 填充
- IMAGE - 图像
- POINT - 点
- 更多...

## 支持的 DWG 版本

- R13 (AC1012)
- R14 (AC1014)
- R2000 (AC1015)
- R2004 (AC1018)
- R2007 (AC1021)
- R2010 (AC1024)
- R2013 (AC1027)
- R2018 (AC1032)

## 构建

```bash
# 安装依赖
npm install

# 构建
npm run build

# 类型检查
npm run typecheck
```
