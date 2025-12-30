interface DwgClass {
    /**
     * Class DXF record name; always unique
     */
    dxfName: string;
    /**
     * C++ class name. Used to bind with software that defines object class behavior; always unique
     */
    cppName: string;
    /**
     * Application name. Posted in Alert box when a class definition listed in this section is not currently loaded
     */
    appName: string;
    /**
     * Proxy capabilities flag. Bit-coded value that indicates the capabilities of this object as a proxy:
     * - 0 = No operations allowed (0)
     * - 1 = Erase allowed (0x1)
     * - 2 = Transform allowed (0x2)
     * - 4 = Color change allowed (0x4)
     * - 8 = Layer change allowed (0x8)
     * - 16 = Linetype change allowed (0x10)
     * - 32 = Linetype scale change allowed (0x20)
     * - 64 = Visibility change allowed (0x40)
     * - 128 = Cloning allowed (0x80)
     * - 256 = Lineweight change allowed (0x100)
     * - 512 = Plot Style Name change allowed (0x200)
     * - 895 = All operations except cloning allowed (0x37F)
     * - 1023 = All operations allowed (0x3FF)
     * - 1024 = Disables proxy warning dialog (0x400)
     * - 32768 = R13 format proxy (0x8000)
     */
    capabilitiesFlag: number;
    /**
     * Instance count for a custom class
     */
    instanceCount: number;
    /**
     * Was-a-proxy flag. Set to 1 if class was not loaded when this DXF file was created,
     * and 0 otherwise
     */
    wasAProxyFlag: boolean;
    /**
     * Is-an-entity flag. Set to 1 if class was derived from the AcDbEntity class and can reside in
     * the BLOCKS or ENTITIES section. If 0, instances may appear only in the OBJECTS section
     */
    isAnEntityFlag: boolean;
}

declare const isModelSpace: (name: string) => boolean | "";
declare const isPaperSpace: (name: string) => boolean | "";
interface DwgPoint2D {
    x: number;
    y: number;
}
interface DwgPoint2DWithWeight {
    x: number;
    y: number;
    w: number;
}
interface DwgPoint3D {
    x: number;
    y: number;
    z: number;
}
interface DwgPoint4D {
    x: number;
    y: number;
    z: number;
    w: number;
}

declare enum DwgCodePage {
    CP_UTF8 = 0,
    CP_US_ASCII = 1,
    CP_ISO_8859_1 = 2,
    CP_ISO_8859_2 = 3,
    CP_ISO_8859_3 = 4,
    CP_ISO_8859_4 = 5,
    CP_ISO_8859_5 = 6,
    CP_ISO_8859_6 = 7,
    CP_ISO_8859_7 = 8,
    CP_ISO_8859_8 = 9,
    CP_ISO_8859_9 = 10,
    CP_CP437 = 11,// DOS English
    CP_CP850 = 12,// 12 DOS Latin-1
    CP_CP852 = 13,// DOS Central European
    CP_CP855 = 14,// DOS Cyrillic
    CP_CP857 = 15,// DOS Turkish
    CP_CP860 = 16,// DOS Portoguese
    CP_CP861 = 17,// DOS Icelandic
    CP_CP863 = 18,// DOS Hebrew
    CP_CP864 = 19,// DOS Arabic (IBM)
    CP_CP865 = 20,// DOS Nordic
    CP_CP869 = 21,// DOS Greek
    CP_CP932 = 22,// DOS Japanese (shiftjis)
    CP_MACINTOSH = 23,// 23
    CP_BIG5 = 24,
    CP_CP949 = 25,// Korean (Wansung + Johab)
    CP_JOHAB = 26,// Johab?
    CP_CP866 = 27,// Russian
    CP_ANSI_1250 = 28,// Central + Eastern European
    CP_ANSI_1251 = 29,// Cyrillic
    CP_ANSI_1252 = 30,// Western European
    CP_GB2312 = 31,// EUC-CN Chinese
    CP_ANSI_1253 = 32,// Greek
    CP_ANSI_1254 = 33,// Turkish
    CP_ANSI_1255 = 34,// Hebrew
    CP_ANSI_1256 = 35,// Arabic
    CP_ANSI_1257 = 36,// Baltic
    CP_ANSI_874 = 37,// Thai
    CP_ANSI_932 = 38,// 38 Japanese (extended shiftjis, windows-31j)
    CP_ANSI_936 = 39,// 39 Simplified Chinese
    CP_ANSI_949 = 40,// 40 Korean Wansung
    CP_ANSI_950 = 41,// 41 Trad Chinese
    CP_ANSI_1361 = 42,// 42 Korean Wansung
    CP_UTF16 = 43,
    CP_ANSI_1258 = 44,// Vietnamese
    CP_UNDEFINED = 255
}
declare const dwgCodePageToEncoding: (codepage: DwgCodePage) => string;

interface DwgXData {
    appName: string;
    value: DwgXDataEntry[];
}
interface DwgXDataEntry {
    name?: string;
    value: DwgXDataEntry[] | number | string | DwgPoint3D;
}

interface DwgEntity {
    /**
     * Entity type
     */
    type: string;
    /**
     * Handle
     */
    handle: number;
    /**
     * Soft-pointer ID/handle to owner BLOCK_RECORD object
     */
    ownerBlockRecordSoftId: number;
    /**
     * Absent or zero indicates entity is in model space. 1 indicates entity is in paper space (optional).
     */
    isInPaperSpace?: boolean;
    /**
     * Layer name
     */
    layer: string;
    /**
     * Linetype name (present if not BYLAYER). The special name BYBLOCK indicates a floating linetype (optional)
     */
    lineType?: string;
    /**
     * Hard-pointer ID/handle to material object (present if not BYLAYER)
     */
    materialObjectHardId?: string;
    /**
     * Color number (present if not BYLAYER); zero indicates the BYBLOCK (floating) color; 256 indicates
     * BYLAYER; a negative value indicates that the layer is turned off (optional)
     */
    colorIndex?: number;
    /**
     * Lineweight enum value. Stored and moved around as a 16-bit integer.
     */
    lineweight?: number;
    /**
     * Linetype scale (optional)
     */
    lineTypeScale?: number;
    /**
     * Object visibility (optional):
     * - 0: Visible
     * - 1: Invisible
     */
    isVisible?: boolean;
    /**
     * Number of bytes in the proxy entity graphics represented in the subsequent 310 groups,
     * which are binary chunk records (optional)
     */
    proxyByte?: number;
    /**
     * Proxy entity graphics data (multiple lines; 256 characters max. per line) (optional)
     */
    proxyEntity?: string;
    /**
     * A 24-bit color value that should be dealt with in terms of bytes with values of 0 to 255.
     * The lowest byte is the blue value, the middle byte is the green value, and the third byte
     * is the red value. The top byte is always 0.
     */
    color?: number;
    /**
     * Color name.
     */
    colorName?: string;
    /**
     * Transparency value.
     */
    transparency?: number;
    /**
     * Transparency type.
     * - 0 BYLAYER
     * - 1 BYBLOCK
     * - 3 alpha
     */
    transparencyType: number;
    /**
     * Hard-pointer ID/handle to the plot style object
     */
    plotStyleHardId?: string;
    /**
     * Shadow mode
     * - 0: Casts and receives shadows
     * - 1: Casts shadows
     * - 2: Receives shadows
     * - 3: Ignores shadows
     *
     * Note: Starting with AutoCAD 2016-based products, this property is obsolete but still supported
     * for backwards compatibility.
     */
    shadowMode?: number;
    /**
     * The extension dictionary attached to the entity (optional).
     */
    xdata?: DwgXData;
    /**
     * Hard-owner ID/handle to owner dictionary (optional)
     */
    ownerDictionaryHardId?: string | number | boolean;
    /**
     * Soft-pointer ID/handle to owner dictionary (optional)
     */
    ownerDictionarySoftId?: string | number | boolean;
}

interface Dwg3dFaceEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: '3DFACE';
    /**
     * First corner (in WCS)
     */
    corner1: DwgPoint3D;
    /**
     * Second corner (in WCS)
     */
    corner2: DwgPoint3D;
    /**
     * Third corner (in WCS)
     */
    corner3: DwgPoint3D;
    /**
     * Fourth corner (in WCS). If only three corners are entered, this is the same as
     * the third corner
     */
    corner4?: DwgPoint3D;
    /**
     * Invisible edge flags (optional; default = 0):
     * - 1: First edge is invisible
     * - 2: Second edge is invisible
     * - 4: Third edge is invisible
     * - 8: Fourth edge is invisible
     */
    flag: number;
}

interface DwgArcEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'ARC';
    /**
     * Thickness (optional; default = 0)
     */
    thickness: number;
    /**
     * Center point (in OCS)
     */
    center: DwgPoint3D;
    /**
     * Radius
     */
    radius: number;
    /**
     * Start angle
     */
    startAngle: number;
    /**
     * End angle
     */
    endAngle: number;
    /**
     * Extrusion direction (optional; default = 0, 0, 1)
     */
    extrusionDirection: DwgPoint3D;
}

declare enum DwgDimensionType {
    Rotated = 0,
    Aligned = 1,
    Angular = 2,
    Diameter = 3,
    Radius = 4,
    Angular3Point = 5,
    Ordinate = 6,
    ReferenceIsExclusive = 32,
    IsOrdinateXTypeFlag = 64,
    IsCustomTextPositionFlag = 128
}
declare enum DwgAttachmentPoint {
    TopLeft = 1,
    TopCenter = 2,
    TopRight = 3,
    MiddleLeft = 4,
    MiddleCenter = 5,
    MiddleRight = 6,
    BottomLeft = 7,
    BottomCenter = 8,
    BottomRight = 9
}
declare enum DwgDimensionTextLineSpacing {
    AtLeast = 1,
    Exact = 2
}
declare enum DwgDimensionTextVertical {
    Center = 0,
    Above = 1,
    Outside = 2,
    JIS = 3,
    Below = 4
}
declare enum DwgDimensionZeroSuppression {
    Feet = 0,
    None = 1,
    Inch = 2,
    FeetAndInch = 3,
    Leading = 4,
    Trailing = 8,
    LeadingAndTrailing = 12
}
declare enum DwgDimensionZeroSuppressionAngular {
    None = 0,
    Leading = 1,
    Trailing = 2,
    LeadingAndTrailing = 3
}
declare enum DwgDimensionTextHorizontal {
    Center = 0,
    Left = 1,
    Right = 2,
    OverFirst = 3,
    OverSecond = 4
}
declare enum DwgDimensionToleranceTextVertical {
    Bottom = 0,
    Center = 1,
    Top = 2
}
interface DwgDimensionEntityCommon extends DwgEntity {
    type: 'DIMENSION';
    subclassMarker: string;
    /**
     * Version number:
     * - 0: 2010
     */
    version: number;
    /**
     * Name of the block that contains the entities that make up the dimension picture
     */
    name: string;
    /**
     * Definition point (in WCS)
     */
    definitionPoint: DwgPoint3D;
    /**
     * Middle point of dimension text (in OCS)
     */
    textPoint: DwgPoint2D;
    /**
     * Dimension type: Values 0-6 are integer values that represent the dimension type.
     * Values 32, 64, and 128 are bit values, which are added to the integer values
     * (value 32 is always set in R13 and later releases)
     * - 0: Rotated, horizontal, or vertical
     * - 1: Aligned
     * - 2: Angular
     * - 3: Diameter
     * - 4: Radius
     * - 5: Angular 3-point
     * - 6: Ordinate
     * - 32: Indicates that the block reference (group code 2) is referenced by this dimension only
     * - 64: Ordinate type. This is a bit value (bit 7) used only with integer value 6. If set,
     * ordinate is X-type; if not set, ordinate is Y-type.
     * - 128: This is a bit value (bit 8) added to the other group 70 values if the dimension text
     * has been positioned at a user-defined location rather than at the default location.
     */
    dimensionType: DwgDimensionType;
    /**
     * Attachment point:
     * - 1: Top left
     * - 2: Top center
     * - 3: Top right
     * - 4: Middle left
     * - 5: Middle center
     * - 6: Middle right
     * - 7: Bottom left
     * - 8: Bottom center
     * - 9: Bottom right
     */
    attachmentPoint: DwgAttachmentPoint;
    /**
     * Dimension text line-spacing style (optional):
     * - 1 (or missing): At least (taller characters will override)
     * - 2: Exact (taller characters will not override)
     */
    textLineSpacingStyle?: DwgDimensionTextLineSpacing;
    /**
     * Dimension text-line spacing factor (optional):
     * Percentage of default (3-on-5) line spacing to be applied. Valid values range from 0.25 to 4.00
     */
    textLineSpacingFactor?: number;
    /**
     * Actual measurement (optional; read-only value)
     */
    measurement?: number;
    /**
     * Dimension text explicitly entered by the user. Optional; default is the measurement. If null
     * or “<>”, the dimension measurement is drawn as the text, if ““ (one blank space), the text is
     * suppressed. Anything else is drawn as the text
     */
    text?: string;
    /**
     * The rotation angle of the dimension text away from its default orientation (the direction of
     * the dimension line) (optional)
     */
    textRotation?: number;
    /**
     * The horizontal direction for the dimension entity. The dimension entity determines the orientation
     * of dimension text and lines for horizontal, vertical, and rotated linear dimensions
     * This group value is the negative of the angle between the OCS X axis and the UCS X axis. It is
     * always in the XY plane of the OCS.
     */
    ocsRotation?: number;
    /**
     * Extrusion direction (optional; default = 0, 0, 1)
     */
    extrusionDirection?: DwgPoint3D;
    /**
     * Dimension style name
     */
    styleName: string;
}
interface DwgAlignedDimensionEntity extends DwgDimensionEntityCommon {
    subclassMarker: 'AcDbAlignedDimension' | 'AcDbRotatedDimension';
    insertionPoint?: DwgPoint2D;
    subDefinitionPoint1: DwgPoint3D;
    subDefinitionPoint2: DwgPoint3D;
    rotationAngle: number;
    obliqueAngle: number;
}
interface DwgAngularDimensionEntity extends DwgDimensionEntityCommon {
    /**
     * 	Subclass marker (AcDb3PointAngularDimension)
     */
    subclassMarker: 'AcDb3PointAngularDimension';
    /**
     * Definition point for linear and angular dimensions (in WCS)
     */
    subDefinitionPoint1: DwgPoint3D;
    /**
     * Definition point for linear and angular dimensions (in WCS)
     */
    subDefinitionPoint2: DwgPoint3D;
    /**
     * Definition point for diameter, radius, and angular dimensions (in WCS)
     */
    centerPoint: DwgPoint3D;
    /**
     * Point defining dimension arc for angular dimensions (in OCS)
     */
    arcPoint: DwgPoint3D;
}
interface DwgOrdinateDimensionEntity extends DwgDimensionEntityCommon {
    /**
     * Subclass marker (AcDbOrdinateDimension)
     */
    subclassMarker: 'AcDbOrdinateDimension';
    /**
     * Definition point for linear and angular dimensions (in WCS)
     */
    subDefinitionPoint1: DwgPoint3D;
    /**
     * Definition point for linear and angular dimensions (in WCS)
     */
    subDefinitionPoint2: DwgPoint3D;
}
interface DwgRadialDiameterDimensionEntity extends DwgDimensionEntityCommon {
    /**
     * Subclass marker (AcDbRadialDimension or AcDbDiametricDimension)
     */
    subclassMarker: 'AcDbRadialDimension' | 'AcDbDiametricDimension';
    /**
     * Definition point for diameter, radius, and angular dimensions (in WCS)
     */
    centerPoint: DwgPoint3D;
    /**
     * Leader length for radius and diameter dimensions
     */
    leaderLength: number;
}
type DwgDimensionEntity = DwgDimensionEntityCommon & (Partial<DwgAlignedDimensionEntity> | Partial<DwgAngularDimensionEntity> | Partial<DwgOrdinateDimensionEntity> | Partial<DwgRadialDiameterDimensionEntity>);

declare enum DwgTextGenerationFlag {
    NONE = 0,
    MIRRORED_X = 2,
    MIRRORED_Y = 4
}
declare enum DwgTextHorizontalAlign {
    LEFT = 0,
    CENTER = 1,
    RIGHT = 2,
    ALIGNED = 3,
    MIDDLE = 4,
    FIT = 5
}
declare enum DwgTextVerticalAlign {
    BASELINE = 0,
    BOTTOM = 1,
    MIDDLE = 2,
    TOP = 3
}
interface DwgTextBase {
    /**
     * Text value
     */
    text: string;
    /**
     * Thickness (optional; default = 0)
     */
    thickness: number;
    /**
     * First alignment point (in OCS)
     */
    startPoint: DwgPoint2D;
    /**
     * Second alignment point (in OCS) (optional)
     * This value is meaningful only if the justification is anything other than baseline/left
     */
    endPoint: DwgPoint2D;
    /**
     * Text height
     */
    textHeight: number;
    /**
     * Text rotation (optional; default = 0)
     */
    rotation: number;
    /**
     * Relative X scale factor—width (optional; default = 1)
     * This value is also adjusted when fit-type text is used
     */
    xScale: number;
    /**
     * Oblique angle (optional; default = 0)
     */
    obliqueAngle: number;
    /**
     * Text style name (optional, default = STANDARD)
     */
    styleName: 'STANDARD' | string;
    /**
     * Text generation flags (optional, default = 0):
     * - 2: Text is backward (mirrored in X)
     * - 4: Text is upside down (mirrored in Y)
     */
    generationFlag: DwgTextGenerationFlag;
    /**
     * Horizontal text justification type (optional, default = 0) integer codes (not bit-coded):
     * - 0: Left
     * - 1: Center
     * - 2: Right
     * - 3: Aligned (if vertical alignment = 0)
     * - 4: Middle (if vertical alignment = 0)
     * - 5: Fit (if vertical alignment = 0)
     */
    halign: DwgTextHorizontalAlign;
    /**
     * Vertical text justification type (optional, default = 0): integer codes (not bit-coded):
     * - 0: Baseline
     * - 1: Bottom
     * - 2: Middle
     * - 3: Top
     */
    valign: DwgTextVerticalAlign;
    /**
     * Extrusion direction (optional; default = 0, 0, 1)
     */
    extrusionDirection: DwgPoint3D;
}
interface DwgTextEntity extends DwgEntity, DwgTextBase {
    /**
     * Entity type
     */
    type: 'TEXT';
}

interface DwgEmbeddedMText {
    /**
     * Insertion point
     */
    insertionPoint: DwgPoint3D;
    /**
     * Nominal (initial) text height
     */
    rectHeight: number;
    /**
     * Reference rectangle width
     */
    rectWidth: number;
    /**
     * Horizontal width of the characters that make up the mtext entity. This value will always be equal to
     * or less than the value of 'rectWidth' (read-only, ignored if supplied)
     */
    extentsWidth: number;
    /**
     * Vertical height of the mtext entity (read-only, ignored if supplied)
     */
    extentsHeight: number;
    /**
     * Attachment point:
     * - 1: Top left
     * - 2: Top center
     * - 3: Top right
     * - 4: Middle left
     * - 5: Middle center
     * - 6: Middle right
     * - 7: Bottom left
     * - 8: Bottom center
     * - 9: Bottom right
     */
    attachmentPoint: DwgAttachmentPoint;
    /**
     * X-axis direction vector (in WCS)
     */
    direction: DwgPoint3D;
}
interface DwgAttdefEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'ATTDEF';
    /**
     * Text attributes
     */
    text: DwgTextBase;
    /**
     * Prompt string
     */
    prompt: string;
    /**
     * Tag string (cannot contain spaces)
     */
    tag: string;
    /**
     * Attribute flags:
     * - 1: Attribute is invisible (does not appear)
     * - 2: This is a constant attribute
     * - 4: Verification is required on input of this attribute
     * - 8: Attribute is preset (no prompt during insertion)
     */
    flags: number;
    /**
     * Field length (optional; default = 0) (not currently used)
     */
    fieldLength: number;
    /**
     * Lock position flag. Locks the position of the attribute within the block reference.
     */
    lockPositionFlag: boolean;
    /**
     * Duplicate record cloning flag (determines how to merge duplicate entries):
     * - 1: Keep existing
     */
    duplicateRecordCloningFlag: boolean;
    /**
     * MText flag:
     * - 2: multiline attribute
     * - 4: constant multiline attribute definition
     */
    mtextFlag: number;
    /**
     * isReallyLocked flag:
     * - 0: unlocked
     * - 1: locked
     */
    isReallyLocked: boolean;
    /**
     * Number of secondary attributes or attribute definitions
     */
    numberOfSecondaryAttrs?: number;
    /**
     * hard-pointer id of secondary attribute(s) or attribute definition(s)
     */
    secondaryAttrsHardId?: number;
    /**
     * Alignment point of attribute or attribute definition.
     */
    alignmentPoint?: DwgPoint2D;
    /**
     * current annotation scale
     */
    annotationScale: number;
    /**
     * attribute or attribute definition tag string
     */
    attrTag: string;
    /**
     * MText attributes
     */
    mtext: DwgEmbeddedMText;
}

interface DwgAttribEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'ATTRIB';
    /**
     * Text attributes
     */
    text: DwgTextBase;
    /**
     * Tag string (cannot contain spaces)
     */
    tag: string;
    /**
     * Attribute flags:
     * - 1: Attribute is invisible (does not appear)
     * - 2: This is a constant attribute
     * - 4: Verification is required on input of this attribute
     * - 8: Attribute is preset (no prompt during insertion)
     */
    flags: number;
    /**
     * Field length (optional; default = 0) (not currently used)
     */
    fieldLength: number;
    /**
     * Lock position flag. Locks the position of the attribute within the block reference.
     */
    lockPositionFlag: boolean;
    /**
     * Duplicate record cloning flag (determines how to merge duplicate entries):
     * - 1: Keep existing
     */
    duplicateRecordCloningFlag: boolean;
    /**
     * MText flag:
     * - 2: multiline attribute
     * - 4: constant multiline attribute definition
     */
    mtextFlag: number;
    /**
     * isReallyLocked flag:
     * - 0: unlocked
     * - 1: locked
     */
    isReallyLocked: boolean;
    /**
     * Number of secondary attributes or attribute definitions
     */
    numberOfSecondaryAttrs: number;
    /**
     * hard-pointer id of secondary attribute(s) or attribute definition(s)
     */
    secondaryAttrsHardId: number;
    /**
     * Alignment point of attribute or attribute definition.
     */
    alignmentPoint: DwgPoint3D;
    /**
     * current annotation scale
     */
    annotationScale: number;
    /**
     * attribute or attribute definition tag string
     */
    attrTag: string;
    /**
     * MText attributes
     */
    mtext: DwgEmbeddedMText;
}

interface DwgCircleEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'CIRCLE';
    /**
     * Thickness (optional; default = 0)
     */
    thickness: number;
    /**
     * Center point (in OCS)
     */
    center: DwgPoint3D;
    /**
     * Radius
     */
    radius: number;
    /**
     * Extrusion direction (optional; default = 0, 0, 1)
     */
    extrusionDirection: DwgPoint3D;
}

interface DwgEllipseEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'ELLIPSE';
    /**
     * Center point (in WCS)
     */
    center: DwgPoint3D;
    /**
     * Endpoint of major axis, relative to the center (in WCS)
     */
    majorAxisEndPoint: DwgPoint3D;
    /**
     * Extrusion direction (optional; default = 0, 0, 1)
     */
    extrusionDirection: DwgPoint3D;
    /**
     * Ratio of minor axis to major axis
     */
    axisRatio: number;
    /**
     * Start parameter (this value is 0.0 for a full ellipse)
     */
    startAngle: number;
    /**
     * End parameter (this value is 2pi for a full ellipse)
     */
    endAngle: number;
}

declare enum DwgHatchSolidFill {
    PatternFill = 0,
    SolidFill = 1
}
declare enum DwgHatchAssociativity {
    NonAssociative = 0,// For MPolygon LacksSolidFill
    Associative = 1
}
declare enum DwgHatchStyle {
    Normal = 0,// Odd parity area
    Outer = 1,// Outermost area
    Ignore = 2
}
declare enum DwgHatchPatternType {
    UserDefined = 0,
    Predefined = 1,
    Custom = 2
}
declare enum DwgHatchBoundaryAnnotation {
    NotAnnotated = 0,
    Annotated = 1
}
declare enum DwgHatchGradientFlag {
    Solid = 0,
    Gradient = 1
}
declare enum DwgHatchGradientColorFlag {
    TwoColor = 0,
    OneColor = 1
}
declare enum DwgBoundaryPathTypeFlag {
    Default = 0,
    External = 1,
    Polyline = 2,
    Derived = 4,
    Textbox = 8,
    Outermost = 16
}
declare enum DwgBoundaryPathEdgeType {
    Line = 1,
    Circular = 2,
    Elliptic = 3,
    Spline = 4
}
interface DwgBoundaryPathBase {
    boundaryPathTypeFlag: number;
}
interface DwgPolylineBoundaryPath extends DwgBoundaryPathBase {
    hasBulge: boolean;
    isClosed: boolean;
    numberOfVertices: number;
    vertices: (DwgPoint2D & {
        bulge: number;
    })[];
}
interface DwgEdgeBoundaryPath<EdgeType extends DwgBoundaryPathEdge> extends DwgBoundaryPathBase {
    numberOfEdges: number;
    edges: EdgeType[];
}
interface DwgBoundaryPathEdgeCommon {
    type: DwgBoundaryPathEdgeType;
}
type DwgBoundaryPath = DwgPolylineBoundaryPath | DwgEdgeBoundaryPath<DwgBoundaryPathEdge>;
interface DwgLineEdge extends DwgBoundaryPathEdgeCommon {
    start: DwgPoint2D;
    end: DwgPoint2D;
}
interface DwgArcEdge extends DwgBoundaryPathEdgeCommon {
    center: DwgPoint2D;
    radius: number;
    startAngle: number;
    endAngle: number;
    isCCW?: boolean;
}
interface DwgEllipseEdge extends DwgBoundaryPathEdgeCommon {
    center: DwgPoint2D;
    end: DwgPoint2D;
    lengthOfMinorAxis: number;
    startAngle: number;
    endAngle: number;
    isCCW?: boolean;
}
interface DwgSplineEdge extends DwgBoundaryPathEdgeCommon {
    degree: number;
    isPeriodic?: boolean;
    numberOfKnots: number;
    numberOfControlPoints: number;
    knots: number[];
    controlPoints: (DwgPoint2D & {
        weight?: number;
    })[];
    numberOfFitData: number;
    fitDatum: DwgPoint2D[];
    startTangent: DwgPoint2D;
    endTangent: DwgPoint2D;
}
type DwgBoundaryPathEdge = DwgLineEdge | DwgArcEdge | DwgEllipseEdge | DwgSplineEdge;
interface DwgHatchDefinitionLine {
    angle: number;
    base: DwgPoint2D;
    offset: DwgPoint2D;
    numberOfDashLengths: number;
    dashLengths: number[];
}
interface DwgHatchEntityBase extends DwgEntity {
    type: 'HATCH';
    extrusionDirection?: DwgPoint3D;
    patternName: string;
    solidFill: DwgHatchSolidFill;
    associativity: DwgHatchAssociativity;
    numberOfBoundaryPaths: number;
    boundaryPaths: DwgBoundaryPath[];
    hatchStyle: DwgHatchStyle;
    patternType: DwgHatchPatternType;
    patternAngle?: number;
    patternScale?: number;
    numberOfDefinitionLines: number;
    definitionLines: DwgHatchDefinitionLine[];
    pixelSize: number;
    numberOfSeedPoints: number;
    offsetVector?: DwgPoint3D;
    seedPoints?: DwgPoint2D[];
    gradientFlag?: DwgHatchGradientFlag;
}
interface DwgGradientHatchEntity extends DwgHatchEntityBase {
    gradientFlag: DwgHatchGradientFlag.Gradient;
    gradientColorFlag: DwgHatchGradientColorFlag;
    numberOfColors: 0 | 2;
    gradientRotation?: number;
    gradientDefinition: number;
    colorTint?: number;
}
type DwgHatchEntity = DwgGradientHatchEntity | DwgHatchEntityBase;

declare enum DwgImageFlags {
    ShowImage = 1,
    ShowImageWhenNotAlignedWithScreen = 2,
    UseClippingBoundary = 4,
    TransparencyIsOn = 8
}
declare enum DwgImageClippingBoundaryType {
    Rectangular = 1,
    Polygonal = 2
}
declare enum DwgImageClipMode {
    Outside = 0,
    Inside = 1
}
interface DwgImageEntity extends DwgEntity {
    type: 'IMAGE';
    version: number;
    position: DwgPoint3D;
    uPixel: DwgPoint3D;
    vPixel: DwgPoint3D;
    imageSize: DwgPoint2D;
    imageDefHandle: number;
    flags: DwgImageFlags;
    clipping: number;
    brightness: number;
    contrast: number;
    fade: number;
    imageDefReactorHandle: number;
    clippingBoundaryType: DwgImageClippingBoundaryType;
    countBoundaryPoints: number;
    clippingBoundaryPath: DwgPoint3D[];
    clipMode: DwgImageClipMode;
}

interface DwgInsertEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'INSERT';
    /**
     * Variable attributes-follow flag (optional; default = 0); if the value of attributes-follow
     * flag is 1, a series of attribute entities is expected to follow the insert, terminated by
     * a seqend entity
     */
    isVariableAttributes?: boolean;
    /**
     * Block name
     */
    name: string;
    /**
     * Insertion point (in OCS)
     */
    insertionPoint: DwgPoint3D;
    /**
     * X scale factor (optional; default = 1)
     */
    xScale: number;
    /**
     * Y scale factor (optional; default = 1)
     */
    yScale: number;
    /**
     * Z scale factor (optional; default = 1)
     */
    zScale: number;
    /**
     * Rotation angle (optional; default = 0)
     */
    rotation: number;
    /**
     * Column count (optional; default = 1)
     */
    columnCount: number;
    /**
     * Row count (optional; default = 1)
     */
    rowCount: number;
    /**
     * Column spacing (optional; default = 0)
     */
    columnSpacing: number;
    /**
     * Row spacing (optional; default = 0)
     */
    rowSpacing: number;
    /**
     * Extrusion direction (optional; default = 0, 0, 1)
     */
    extrusionDirection: DwgPoint3D;
}

declare enum DwgLeaderCreationFlag {
    TextAnnotation = 0,
    ToleranceAnnotation = 1,
    BlockReferenceAnnotation = 2,
    NoAnnotation = 3
}
interface DwgLeaderEntity extends DwgEntity {
    type: 'LEADER';
    /**
     * Dimension style name
     */
    styleName: string;
    /**
     * Arrowhead flag:
     * - 0: Disabled
     * - 1: Enabled
     */
    isArrowheadEnabled: boolean;
    /**
     * Leader path type:
     * - 0: Straight line segments
     * - 1: Spline
     */
    isSpline: boolean;
    /**
     * Leader creation flag (default = 3):
     * - 0: Created with text annotation
     * - 1: Created with tolerance annotation
     * - 2: Created with block reference annotation
     * - 3: Created without any annotation
     */
    leaderCreationFlag: DwgLeaderCreationFlag;
    /**
     * Hookline direction flag:
     * - 0: Hookline (or end of tangent for a splined leader) is the opposite direction from the horizontal vector
     * - 1: Hookline (or end of tangent for a splined leader) is the same direction as horizontal vector (see code 75)
     */
    isHooklineSameDirection: boolean;
    /**
     * Hookline flag:
     * - 0: No hookline
     * - 1: Has a hookline
     */
    isHooklineExists: boolean;
    /**
     * Text annotation height
     */
    textHeight?: number;
    /**
     * Text annotation width
     */
    textWidth?: number;
    /**
     * Number of vertices in leader (ignored for OPEN)
     */
    numberOfVertices?: number;
    /**
     * Vertex coordinates (one entry for each vertex)
     */
    vertices: DwgPoint3D[];
    /**
     * Color to use if leader's DIMCLRD = BYBLOCK
     */
    byBlockColor?: number;
    /**
     * Hard reference to associated annotation (mtext, tolerance, or insert entity)
     */
    associatedAnnotation?: string;
    /**
     * Normal vector
     */
    normal?: DwgPoint3D;
    /**
     * Horizontal direction for leader
     */
    horizontalDirection?: DwgPoint3D;
    /**
     * Offset of last leader vertex from block reference insertion point
     */
    offsetFromBlock?: DwgPoint3D;
    /**
     * Offset of last leader vertex from annotation placement point
     */
    offsetFromAnnotation?: DwgPoint3D;
}

interface DwgLineEntity extends DwgEntity {
    type: 'LINE';
    thickness: number;
    startPoint: DwgPoint3D;
    endPoint: DwgPoint3D;
    extrusionDirection: DwgPoint3D;
}

interface DwgLWPolylineEntity extends DwgEntity {
    type: 'LWPOLYLINE';
    flag: number;
    numberOfVertices: number;
    constantWidth?: number;
    elevation: number;
    thickness: number;
    extrusionDirection: DwgPoint3D;
    vertices: DwgLWPolylineVertex[];
}
interface DwgLWPolylineVertex extends DwgPoint2D {
    id: number;
    startWidth?: number;
    endWidth?: number;
    bulge: number;
}

interface DwgMLineLine {
    /**
     * Number of parameters for this element
     */
    numberOfSegmentParams: number;
    /**
     * Element parameters
     */
    segmentParams: number[];
    /**
     * Number of area fill parameters for this element
     */
    numberOfAreaFillParams: number;
    /**
     * Area fill parameters
     */
    areaFillParams: number[];
}
interface DwgMLineVertex {
    /**
     * Vertex coordinates
     */
    vertex: DwgPoint3D;
    /**
     * Direction vector of segment starting at this vertex
     */
    vertexDirection: DwgPoint3D;
    /**
     * Direction vector of miter at this vertex
     */
    miterDirection: DwgPoint3D;
    /**
     * The number of lines
     */
    numberOfLines: number;
    /**
     * The line element
     */
    lines: DwgMLineLine[];
}
interface DwgMLineEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'MLINE';
    /**
     * Scale factor
     */
    scale: number;
    /**
     * Justification:
     * - 0: Top
     * - 1: Zero
     * - 2: Bottom
     */
    justification: number;
    /**
     * Flags (bit-coded values):
     * - 1: Has at least one vertex (code 72 is greater than 0)
     * - 2: Closed
     * - 4: Suppress start caps
     * - 8: Suppress end caps
     */
    flags: number;
    /**
     * Start point (in WCS)
     */
    startPoint: DwgPoint3D;
    /**
     * Extrusion direction (optional; default = 0, 0, 1)
     */
    extrusionDirection?: DwgPoint3D;
    /**
     * Number of vertices
     */
    numberOfVertices: number;
    /**
     * Number of elements in MLINESTYLE definition
     */
    numberOfLines: number;
    /**
     * Vertices
     */
    vertices: DwgMLineVertex[];
    /**
     * String of up to 32 characters. The name of the style used for this mline. An entry for
     * this style must exist in the MLINESTYLE dictionary. Do not modify this field without
     * also updating the associated entry in the MLINESTYLE dictionary.
     */
    mlineStyle: string;
}

declare enum DwgMTextDrawingDirection {
    LEFT_TO_RIGHT = 1,
    TOP_TO_BOTTOM = 3,
    BY_STYLE = 5
}
interface DwgMTextEntity extends DwgEntity {
    type: 'MTEXT';
    /**
     * Insertion point
     */
    insertionPoint: DwgPoint3D;
    /**
     * Nominal (initial) text height
     */
    textHeight: number;
    /**
     * Reference rectangle height. No DXF group code
     */
    rectHeight?: number;
    /**
     * Reference rectangle width
     */
    rectWidth: number;
    /**
     * Horizontal width of the characters that make up the mtext entity. This value will always be equal to
     * or less than the value of 'rectWidth' (read-only, ignored if supplied)
     */
    extentsWidth: number;
    /**
     * Vertical height of the mtext entity (read-only, ignored if supplied)
     */
    extentsHeight: number;
    /**
     * Attachment point:
     * - 1: Top left
     * - 2: Top center
     * - 3: Top right
     * - 4: Middle left
     * - 5: Middle center
     * - 6: Middle right
     * - 7: Bottom left
     * - 8: Bottom center
     * - 9: Bottom right
     */
    attachmentPoint: DwgAttachmentPoint;
    /**
     * Drawing direction:
     * - 1: Left to right
     * - 3: Top to bottom
     * - 5: By style (the flow direction is inherited from the associated text style)
     */
    drawingDirection: DwgMTextDrawingDirection;
    /**
     * Text string
     */
    text: string;
    /**
     * Text style name (STANDARD if not provided) (optional)
     */
    styleName: string;
    /**
     * Extrusion direction (optional; default = 0, 0, 1)
     */
    extrusionDirection?: DwgPoint3D;
    /**
     * X-axis direction vector (in WCS)
     */
    direction: DwgPoint3D;
    /**
     * Rotation angle in radians
     */
    rotation: number;
    /**
     * Mtext line spacing style (optional):
     * - 1: At least (taller characters will override)
     * - 2: Exact (taller characters will not override)
     */
    lineSpacingStyle: number;
    /**
     * Mtext line spacing factor (optional):
     * Percentage of default (3-on-5) line spacing to be applied. Valid values range from 0.25 to 4.00
     */
    lineSpacing: number;
    /**
     * Background color (if RGB color)
     */
    backgroundFill: number;
    /**
     * Fill box scale (optional):
     * Determines how much border there is around the text.
     */
    fillBoxScale: number;
    /**
     * Background fill color (optional):
     * Color to use for background fill when 'backgroundFill' is 1.
     */
    backgroundFillColor: number;
    /**
     * Transparency of background fill color (not implemented)
     */
    backgroundFillTransparency: number;
    columnType: number;
    columnFlowReversed: number;
    columnAutoHeight: number;
    columnWidth: number;
    columnGutter: number;
    columnHeightCount: number;
    columnHeights: number[];
}

interface DwgOleFrameEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'OLEFRAME';
    flag: number;
    mode: number;
    /**
     * Length of binary data
     */
    dataSize: number;
    /**
     * Binary data
     */
    binaryData: string;
}

interface DwgOle2FrameEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'OLE2FRAME';
    /**
     * OLE version number
     */
    oleVersion: number;
    /**
     * OLE or Paintbrush Picture
     */
    oleClient?: string;
    /**
     * Length of binary data
     */
    dataSize: number;
    /**
     * Upper-left corner (WCS)
     */
    leftUpPoint: DwgPoint3D;
    /**
     * Lower-right corner (WCS)
     */
    rightDownPoint: DwgPoint3D;
    /**
     * Flag whether to lock aspect.
     * - 0: not locked
     * - 1: locked
     */
    lockAspect: number;
    /**
     * OLE object type
     * - 1: Link
     * - 2: Embedded
     * - 3: Static
     */
    oleObjectType: number;
    /**
     * Tile mode descriptor:
     * 0: Object resides in model space
     * 1: Object resides in paper space
     */
    tileModeDescriptor: number;
    /**
     * Binary data
     */
    binaryData: string;
}

interface DwgPointEntity extends DwgEntity {
    type: 'POINT';
    position: DwgPoint3D;
    thickness: number;
    extrusionDirection: DwgPoint3D;
    angle: number;
}

declare enum DwgVertexFlag {
    CREATED_BY_CURVE_FIT = 1,
    TANGENT_DEFINED = 2,
    NOT_USED = 4,
    CREATED_BY_SPLINE_FIT = 8,
    SPLINE_CONTROL_POINT = 16,
    FOR_POLYLINE = 32,
    FOR_POLYGON = 64,
    POLYFACE = 128
}
interface DwgVertex2dEntity extends DwgEntity, DwgPoint3D {
    startWidth: number;
    endWidth: number;
    bulge: number;
    flag: DwgVertexFlag;
    tangentDirection: number;
    polyfaceIndex0?: number;
    polyfaceIndex1?: number;
    polyfaceIndex2?: number;
    polyfaceIndex3?: number;
    id: number;
}
interface DwgVertex3dEntity extends DwgEntity, DwgPoint3D {
    flag: DwgVertexFlag;
    id: number;
}

declare enum DwgPolylineFlag {
    CLOSED_POLYLINE = 1,
    CURVE_FIT = 2,
    SPLINE_FIT = 4,
    POLYLINE_3D = 8,
    POLYGON_3D = 16,
    CLOSED_POLYGON = 32,
    POLYFACE = 64,
    CONTINUOUS = 128
}
declare enum DwgSmoothType {
    NONE = 0,
    QUADRATIC = 5,
    CUBIC = 6,
    BEZIER = 8
}
interface DwgPolyline2dEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'POLYLINE2D';
    /**
     * polyline's elevation (in OCS when 2D; WCS when 3D)
     */
    elevation: number;
    /**
     * Thickness (optional; default = 0)
     */
    thickness?: number;
    /**
     * Polyline flag (bit-coded; default = 0):
     * - 1: This is a closed polyline (or a polygon mesh closed in the M direction)
     * - 2: Curve-fit vertices have been added
     * - 4: Spline-fit vertices have been added
     * - 8: This is a 3D polyline
     * - 16: This is a 3D polygon mesh
     * - 32: The polygon mesh is closed in the N direction
     * - 64: The polyline is a polyface mesh
     * - 128: The linetype pattern is generated continuously around the vertices of this polyline
     */
    flag: number;
    /**
     * Default start width (optional; default = 0)
     */
    startWidth?: number;
    /**
     * Default end width (optional; default = 0)
     */
    endWidth?: number;
    /**
     * Polygon mesh M vertex count (optional; default = 0)
     */
    meshMVertexCount?: number;
    /**
     * Polygon mesh N vertex count (optional; default = 0)
     */
    meshNVertexCount?: number;
    /**
     * Smooth surface M density (optional; default = 0)
     */
    surfaceMDensity?: number;
    /**
     * Smooth surface N density (optional; default = 0)
     */
    surfaceNDensity?: number;
    /**
     * Curves and smooth surface type (optional; default = 0); integer codes, not bit-coded:
     * - 0: No smooth surface fitted
     * - 5: Quadratic B-spline surface
     * - 6: Cubic B-spline surface
     * - 8: Bezier surface
     */
    smoothType?: DwgSmoothType;
    /**
     * Extrusion direction (optional; default = 0, 0, 1)
     */
    extrusionDirection?: DwgPoint3D;
    vertices: DwgVertex2dEntity[];
}
interface DwgPolyline3dEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'POLYLINE3D';
    /**
     * Polyline flag (bit-coded; default = 0):
     * - 1: This is a closed polyline (or a polygon mesh closed in the M direction)
     * - 2: Curve-fit vertices have been added
     * - 4: Spline-fit vertices have been added
     * - 8: This is a 3D polyline
     * - 16: This is a 3D polygon mesh
     * - 32: The polygon mesh is closed in the N direction
     * - 64: The polyline is a polyface mesh
     * - 128: The linetype pattern is generated continuously around the vertices of this polyline
     */
    flag: number;
    /**
     * Default start width (optional; default = 0)
     */
    startWidth?: number;
    /**
     * Default end width (optional; default = 0)
     */
    endWidth?: number;
    /**
     * Curves and smooth surface type (optional; default = 0); integer codes, not bit-coded:
     * - 0: No smooth surface fitted
     * - 5: Quadratic B-spline surface
     * - 6: Cubic B-spline surface
     * - 8: Bezier surface
     */
    smoothType?: DwgSmoothType;
    /**
     * Extrusion direction (optional; default = 0, 0, 1)
     */
    extrusionDirection?: DwgPoint3D;
    vertices: DwgVertex3dEntity[];
}

interface DwgProxyEntity extends DwgEntity {
    type: 'PROXY';
    applicationEntityClassId: number;
}

interface DwgRayEntity extends DwgEntity {
    type: 'RAY';
    firstPoint: DwgPoint3D;
    unitDirection: DwgPoint3D;
}

interface DwgSectionEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'SECTION';
    /**
     * Section state
     */
    state: number;
    /**
     * Section flags
     */
    flags: number;
    /**
     * Name
     */
    name: string;
    /**
     * Vertical direction
     */
    verticalDirection: DwgPoint3D;
    /**
     * Top height
     */
    topHeight: number;
    /**
     * Bottom height
     */
    bottomHeight: number;
    /**
     * Indicator transparency
     */
    indicatorTransparency: number;
    /**
     * Indicator color
     */
    indicatorColor: number;
    /**
     * Number of vertices
     */
    numberOfVertices: number;
    /**
     * Vertex (repeats for number of vertices)
     */
    vertices: DwgPoint3D[];
    /**
     * Number of back line vertices
     */
    numberOfBackLineVertices: number;
    /**
     * Back line vertex (repeats for number of back line vertices)
     */
    backLineVertices: DwgPoint3D[];
    /**
     * Hard-pointer ID/handle to geometry settings object
     */
    geometrySettingHardId: bigint;
}

interface DwgSolidEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'SOLID';
    /**
     * Corner1
     */
    corner1: DwgPoint2D;
    /**
     * Corner2
     */
    corner2: DwgPoint2D;
    /**
     * Corner3
     */
    corner3: DwgPoint2D;
    /**
     * Corner4. If only three corners are entered to define the SOLID,
     * then the fourth corner coordinate is the same as the third.
     */
    corner4?: DwgPoint2D;
    /**
     * Thickness (optional; default = 0)
     */
    thickness: number;
    /**
     * Extrusion direction (optional; default = 0, 0, 1)
     */
    extrusionDirection: DwgPoint3D;
}

interface DwgSplineEntity extends DwgEntity {
    type: 'SPLINE';
    normal?: DwgPoint3D;
    flag: number;
    degree: number;
    numberOfKnots: number;
    numberOfControlPoints: number;
    numberOfFitPoints: number;
    knotTolerance: number;
    controlTolerance: number;
    fitTolerance: number;
    startTangent?: DwgPoint3D;
    endTangent?: DwgPoint3D;
    knots: number[];
    weights?: number[];
    controlPoints: DwgPoint3D[];
    fitPoints: DwgPoint3D[];
}

interface DwgTableCell {
    text: string;
    attachmentPoint: DwgAttachmentPoint;
    textStyle?: string;
    rotation?: number;
    cellType: number;
    flagValue?: number;
    mergedValue?: number;
    autoFit?: number;
    borderWidth?: number;
    borderHeight?: number;
    topBorderVisibility: boolean;
    bottomBorderVisibility: boolean;
    leftBorderVisibility: boolean;
    rightBorderVisibility: boolean;
    overrideFlag?: number;
    virtualEdgeFlag?: number;
    fieldObjetId?: string;
    blockTableRecordId?: string;
    blockScale?: number;
    blockAttrNum?: number;
    attrDefineId?: string[];
    attrText?: string;
    textHeight: number;
    extendedCellFlags?: number;
}
interface DwgTableEntity extends DwgEntity {
    type: 'ACAD_TABLE';
    name: string;
    ownerDictionaryId?: string;
    startPoint: DwgPoint3D;
    directionVector: DwgPoint3D;
    attachmentPoint?: DwgAttachmentPoint;
    tableValue: number;
    rowCount: number;
    columnCount: number;
    overrideFlag?: number;
    borderColorOverrideFlag?: number;
    borderLineWeightOverrideFlag?: number;
    borderVisibilityOverrideFlag?: number;
    rowHeightArr: number[];
    columnWidthArr: number[];
    tableStyleId?: string;
    blockRecordHandle?: number;
    cells: DwgTableCell[];
    bmpPreview: string;
}

interface DwgToleranceEntity extends DwgEntity {
    /**
     * Entity type
     */
    type: 'TOLERANCE';
    /**
     * Dimension style name
     */
    styleName: string;
    /**
     * Insertion point (in WCS)
     */
    insertionPoint: DwgPoint3D;
    /**
     * String representing the visual representation of the tolerance
     */
    text: string;
    /**
     * Extrusion direction (optional; default = 0, 0, 1)
     */
    extrusionDirection: DwgPoint3D;
    /**
     * X-axis direction vector (in WCS)
     */
    xAxisDirection: DwgPoint3D;
}

declare enum DwgViewportStatusFlag {
    PERSPECTIVE_MODE = 1,
    FRONT_CLIPPING = 2,
    BACK_CLIPPING = 4,
    UCS_FOLLOW = 8,
    FRONT_CLIP_NOT_AT_EYE = 16,
    UCS_ICON_VISIBILITY = 32,
    UCS_ICON_AT_ORIGIN = 64,
    FAST_ZOOM = 128,
    SNAP_MODE = 256,
    GRID_MODE = 512,
    ISOMETRIC_SNAP_STYLE = 1024,
    HIDE_PLOT_MODE = 2048,
    K_ISO_PAIR_TOP = 4096,
    K_ISO_PAIR_RIGHT = 8192,
    VIEWPORT_ZOOM_LOCKING = 16384,
    UNUSED = 32768,
    NON_RECTANGULAR_CLIPPING = 65536,
    VIEWPORT_OFF = 131072,
    GRID_BEYOND_DRAWING_LIMITS = 262144,
    ADAPTIVE_GRID_DISPLAY = 524288,
    SUBDIVISION_BELOW_SPACING = 1048576,
    GRID_FOLLOWS_WORKPLANE = 2097152
}
declare enum DwgRenderMode {
    OPTIMIZED_2D = 0,// classic 2D
    WIREFRAME = 1,
    HIDDEN_LINE = 2,
    FLAT_SHADED = 3,
    GOURAUD_SHADED = 4,
    FLAT_SHADED_WITH_WIREFRAME = 5,
    GOURAUD_SHADED_WITH_WIREFRAME = 6
}
declare enum DwgUCSPerViewport {
    UCS_UNCHANGED = 0,
    HAS_OWN_UCS = 1
}
declare enum DwgOrthographicType {
    NON_ORTHOGRAPHIC = 0,
    TOP = 1,
    BOTTOM = 2,
    FRONT = 3,
    BACK = 4,
    LEFT = 5,
    RIGHT = 6
}
declare enum DwgShadePlotMode {
    AS_DISPLAYED = 0,
    WIREFRAME = 1,
    HIDDEN = 2,
    RENDERED = 3
}
declare enum DwgDefaultLightingType {
    ONE_DISTANT_LIGHT = 0,
    TWO_DISTANT_LIGHTS = 1
}
interface DwgViewportEntity extends DwgEntity {
    type: 'VIEWPORT';
    viewportCenter: DwgPoint3D;
    width: number;
    height: number;
    status: number;
    viewportId: number;
    displayCenter: DwgPoint2D;
    snapBase: DwgPoint2D;
    snapSpacing: DwgPoint2D;
    gridSpacing: DwgPoint2D;
    viewDirection: DwgPoint3D;
    targetPoint: DwgPoint3D;
    perspectiveLensLength: number;
    frontClipZ: number;
    backClipZ: number;
    viewHeight: number;
    snapAngle: number;
    viewTwistAngle: number;
    circleZoomPercent: number;
    frozenLayerIds?: string[];
    statusBitFlags: number;
    clippingBoundaryId?: string;
    sheetName: string;
    renderMode: DwgRenderMode;
    ucsPerViewport: DwgUCSPerViewport;
    ucsOrigin?: DwgPoint3D;
    ucsXAxis?: DwgPoint3D;
    ucsYAxis?: DwgPoint3D;
    ucsId?: string;
    ucsBaseId?: string;
    orthographicType?: DwgOrthographicType;
    elevation: number;
    shadePlotMode: DwgShadePlotMode;
    majorGridFrequency: number;
    backgroundId?: string;
    shadePlotId?: string;
    visualStyleId?: string;
    isDefaultLighting: boolean;
    defaultLightingType?: DwgDefaultLightingType;
    brightness: number;
    contrast: number;
    ambientLightColor?: string;
    sunId?: string;
    softPointer?: string;
}

interface DwgWipeoutEntity extends DwgEntity {
    type: 'WIPEOUT';
    version: number;
    position: DwgPoint3D;
    uPixel: DwgPoint3D;
    vPixel: DwgPoint3D;
    imageSize: DwgPoint2D;
    imageDefHandle: number;
    flags: DwgImageFlags;
    clipping: number;
    brightness: number;
    contrast: number;
    fade: number;
    imageDefReactorHandle: number;
    clippingBoundaryType: DwgImageClippingBoundaryType;
    countBoundaryPoints: number;
    clippingBoundaryPath: DwgPoint2D[];
    clipMode: DwgImageClipMode;
}

interface DwgXlineEntity extends DwgEntity {
    type: 'XLINE';
    firstPoint: DwgPoint3D;
    unitDirection: DwgPoint3D;
}

type Dwg_Array_Ptr = number;
type Dwg_Data_Ptr = number;
type Dwg_Object_Ptr = number;
type Dwg_Object_Ref_Ptr = number;
type Dwg_Object_Object_Ptr = number;
type Dwg_Object_Entity_Ptr = number;
type Dwg_Object_Generic_Ptr = number;
type Dwg_Object_Object_TIO_Ptr = number;
type Dwg_Object_Entity_TIO_Ptr = number;
type Dwg_Object_LAYER_Ptr = number;
type Dwg_Object_LTYPE_Ptr = number;
type Dwg_Object_STYLE_Ptr = number;
type Dwg_Object_DIMSTYLE_Ptr = number;
type Dwg_Object_VPORT_Ptr = number;
type Dwg_Object_BLOCK_Ptr = number;
type Dwg_Object_BLOCK_HEADER_Ptr = number;
type Dwg_Object_IMAGEDEF_Ptr = number;
type Dwg_Object_VERTEX_2D_Ptr = number;
type Dwg_Object_VERTEX_3D_Ptr = number;
type Dwg_Entity_POLYLINE_2D_Ptr = number;
type Dwg_Entity_POLYLINE_3D_Ptr = number;
type Dwg_Entity_IMAGE_Ptr = number;
type Dwg_Entity_LWPOLYLINE_Ptr = number;
type Dwg_Entity_MTEXT_Ptr = number;
type Dwg_Entity_TEXT_Ptr = number;
interface Dwg_Handle {
    code: number;
    size: number;
    value: number;
    is_global: number;
}
interface Dwg_Object_Ref {
    obj: Dwg_Object_Ptr;
    handleref: Dwg_Handle;
    absolute_ref: number;
    r11_idx: number;
}
interface Dwg_Color {
    /**
     * - <0: turned off
     * - 0: BYBLOCK
     * - 256: BYLAYER
     */
    index: number;
    /**
     * - 1: has name
     * - 2: has book_name.
     */
    flag: number;
    /**
     * DXF 420.
     * The meaning of the first byte of rgb is as follows.
     * - 0xc0 for ByLayer (also c3 and rgb of 0x100)
     * - 0xc1 for ByBlock (also c3 and rgb of 0)
     * - 0xc2 for entities (default), with names with an additional name flag RC
     * - 0xc3 for truecolor
     * - 0xc5 for foreground color
     * - 0xc8 for none (also c3 and rgb of 0x101)
     */
    rgb: number;
    /**
     * It is the first byte of rgb.
     * - 0xc0 for ByLayer (also c3 and rgb of 0x100)
     * - 0xc1 for ByBlock (also c3 and rgb of 0)
     * - 0xc2 for entities (default), with names with an additional name flag RC
     * - 0xc3 for truecolor
     * - 0xc5 for foreground color
     * - 0xc8 for none (also c3 and rgb of 0x101)
     */
    method: number;
    /**
     * DXF 430
     */
    name: string;
    /**
     * DXF 430, DXF: "book_name$name"
     */
    book_name: string;
    /**
     * - 0 BYLAYER
     * - 1 BYBLOCK
     * - 3 alpha
     */
    alpha_type: number;
    /**
     * DXF 440, 0-255
     */
    alpha: number;
}
interface Dwg_Class {
    num: number;
    proxyflag: number;
    appname: string;
    cppname: string;
    dxfname: string;
    s_zombie: boolean;
    item_class_id: number;
    num_instances: number;
    dwg_version: number;
    maint_version: number;
}
interface Dwg_Entity_BLOCK {
    name: string;
    base_pt: DwgPoint2D;
}
interface Dwg_LTYPE_Dash {
    length: number;
    complex_shapecode: number;
    style: number;
    x_offset: number;
    y_offset: number;
    scale: number;
    rotation: number;
    shape_flag: number;
    text: string;
}
interface Dwg_TableCellContent_Attr {
    attdef: number;
    value: string;
    index: number;
}
interface Dwg_ContentFormat {
    property_override_flags: number;
    property_flags: number;
    value_data_type: number;
    value_unit_type: number;
    value_format_string: string;
    rotation: number;
    block_scale: number;
    cell_alignment: number;
    content_color: Dwg_Color;
    text_style: number;
    text_height: number;
}
interface Dwg_TableCellContent {
    type: number;
    attrs: Dwg_TableCellContent_Attr[];
    has_content_format_overrides: boolean;
    content_format: Dwg_ContentFormat;
}
interface Dwg_LinkedData {
    name: string;
    description: string;
}
interface Dwg_TABLE_AttrDef {
    attdef: Dwg_Object_Ref;
    index: number;
    text: string;
}
interface Dwg_TABLE_Cell {
    type: number;
    flags: number;
    is_merged_value: number;
    is_autofit_flag: number;
    merged_width_flag: number;
    merged_height_flag: number;
    rotation: number;
    text_value: string;
    text_style: number;
    block_handle: Dwg_Object_Ref;
    block_scale: number;
    additional_data_flag: number;
    cell_flag_override: number;
    virtual_edge_flag: number;
    cell_alignment: number;
    bg_fill_none: number;
    bg_color: Dwg_Color;
    content_color: Dwg_Color;
    text_height: number;
    top_grid_color: Dwg_Color;
    top_grid_linewt: number;
    top_visibility: number;
    right_grid_color: Dwg_Color;
    right_grid_linewt: number;
    right_visibility: number;
    bottom_grid_color: Dwg_Color;
    bottom_grid_linewt: number;
    bottom_visibility: number;
    left_grid_color: Dwg_Color;
    left_grid_linewt: number;
    left_visibility: number;
    attr_defs: Dwg_TABLE_AttrDef[];
}
interface Dwg_TableCell {
    flag: number;
    tooltip: string;
    has_linked_data: boolean;
    data_link: number;
    num_rows: number;
    num_cols: number;
    cell_contents: Dwg_TableCellContent[];
}
interface Dwg_HATCH_DefLine {
    angle: number;
    pt0: DwgPoint2D;
    offset: DwgPoint2D;
    dashes: number[];
}
interface Dwg_HATCH_PathSeg {
    curve_type: number;
    first_endpoint: DwgPoint2D;
    second_endpoint: DwgPoint2D;
    center: DwgPoint2D;
    radius: number;
    start_angle: number;
    end_angle: number;
    is_ccw: boolean;
    endpoint: DwgPoint2D;
    minor_major_ratio: number;
    degree: number;
    is_rational: boolean;
    is_periodic: boolean;
    num_knots: number;
    num_control_points: number;
    knots: number[];
    control_points: DwgPoint2DWithWeight[];
    num_fitpts: number;
    fitpts: DwgPoint2D[];
    start_tangent: DwgPoint2D;
    end_tangent: DwgPoint2D;
}
interface Dwg_HATCH_PolylinePath {
    point: DwgPoint2D;
    bulge: number;
}
interface Dwg_HATCH_Path {
    flag: number;
    num_segs_or_paths: number;
    segs: Dwg_HATCH_PathSeg[];
    bulges_present: boolean;
    closed: boolean;
    polyline_paths: Dwg_HATCH_PolylinePath[];
}
interface Dwg_HATCH_Path {
    flag: number;
    num_segs_or_paths: number;
    segs: Dwg_HATCH_PathSeg[];
    bulges_present: boolean;
    closed: boolean;
    polyline_paths: Dwg_HATCH_PolylinePath[];
}
interface Dwg_Entity_VERTEX_2D {
    flag: number;
    point: DwgPoint3D;
    start_width: number;
    end_width: number;
    id: number;
    bulge: number;
    tangent_dir: number;
}
interface Dwg_Entity_VERTEX_3D {
    flag: number;
    point: DwgPoint3D;
}
interface Dwg_MLINE_Line {
    num_segparms: number;
    segparms: number[];
    num_areafillparms: number;
    areafillparms: number[];
}
interface Dwg_MLINE_Vertex {
    vertex: DwgPoint3D;
    vertex_direction: DwgPoint3D;
    miter_direction: DwgPoint3D;
    num_lines: number;
    lines: Dwg_MLINE_Line[];
}
type Dwg_Field_Value_Data_Type = string | number | Dwg_Color | Dwg_Array_Ptr | DwgPoint2D | DwgPoint3D;
interface Dwg_Field_Value {
    success: boolean;
    message?: string;
    data?: Dwg_Field_Value_Data_Type;
    /**
     * LibreDWG does not support converting strings to Unicode based on the DWG file’s codepage.
     * If the codepage is not UTF-8, the raw string byte array is returned instead.
     * It is the client’s responsibility to perform the conversion to Unicode.
     * This field is used to store the raw string byte array if the DWG file's codepage isn't utf-8.
     */
    bin?: Uint8Array;
}
/**
 * This interface represents string returned by libredwg.
 *
 * LibreDWG does not support converting strings to Unicode based on the DWG file’s codepage.
 * If the codepage is not UTF-8, the raw string byte array is returned instead.
 * It is the client’s responsibility to perform the conversion to Unicode.
 */
interface Dwg_String {
    /**
     * This field represents utf-8 encoded string. It may contain some corruptted characters due to decoding.
     */
    data: string;
    /**
     * This field is used to store the raw string byte array if the DWG file's codepage isn't utf-8.
     */
    bin?: Uint8Array;
}

declare enum Dwg_Object_Supertype {
    DWG_SUPERTYPE_ENTITY = 0,
    DWG_SUPERTYPE_OBJECT = 1
}
declare enum Dwg_Object_Type$1 {
    DWG_TYPE_UNUSED = 0,
    DWG_TYPE_TEXT = 1,
    DWG_TYPE_ATTRIB = 2,
    DWG_TYPE_ATTDEF = 3,
    DWG_TYPE_BLOCK = 4,
    DWG_TYPE_ENDBLK = 5,
    DWG_TYPE_SEQEND = 6,
    DWG_TYPE_INSERT = 7,
    DWG_TYPE_MINSERT = 8,
    DWG_TYPE_VERTEX_2D = 10,
    DWG_TYPE_VERTEX_3D = 11,
    DWG_TYPE_VERTEX_MESH = 12,
    DWG_TYPE_VERTEX_PFACE = 13,
    DWG_TYPE_VERTEX_PFACE_FACE = 14,
    DWG_TYPE_POLYLINE_2D = 15,
    DWG_TYPE_POLYLINE_3D = 16,
    DWG_TYPE_ARC = 17,
    DWG_TYPE_CIRCLE = 18,
    DWG_TYPE_LINE = 19,
    DWG_TYPE_DIMENSION_ORDINATE = 20,
    DWG_TYPE_DIMENSION_LINEAR = 21,
    DWG_TYPE_DIMENSION_ALIGNED = 22,
    DWG_TYPE_DIMENSION_ANG3PT = 23,
    DWG_TYPE_DIMENSION_ANG2LN = 24,
    DWG_TYPE_DIMENSION_RADIUS = 25,
    DWG_TYPE_DIMENSION_DIAMETER = 26,
    DWG_TYPE_POINT = 27,
    DWG_TYPE_3DFACE = 28,
    DWG_TYPE_POLYLINE_PFACE = 29,
    DWG_TYPE_POLYLINE_MESH = 30,
    DWG_TYPE_SOLID = 31,
    DWG_TYPE_TRACE = 32,
    DWG_TYPE_SHAPE = 33,
    DWG_TYPE_VIEWPORT = 34,
    DWG_TYPE_ELLIPSE = 35,
    DWG_TYPE_SPLINE = 36,
    DWG_TYPE_REGION = 37,
    DWG_TYPE_3DSOLID = 38,
    DWG_TYPE_BODY = 39,
    DWG_TYPE_RAY = 40,
    DWG_TYPE_XLINE = 41,
    DWG_TYPE_DICTIONARY = 42,
    DWG_TYPE_OLEFRAME = 43,
    DWG_TYPE_MTEXT = 44,
    DWG_TYPE_LEADER = 45,
    DWG_TYPE_TOLERANCE = 46,
    DWG_TYPE_MLINE = 47,
    DWG_TYPE_BLOCK_CONTROL = 48,
    DWG_TYPE_BLOCK_HEADER = 49,
    DWG_TYPE_LAYER_CONTROL = 50,
    DWG_TYPE_LAYER = 51,
    DWG_TYPE_STYLE_CONTROL = 52,
    DWG_TYPE_STYLE = 53,
    DWG_TYPE_LTYPE_CONTROL = 56,
    DWG_TYPE_LTYPE = 57,
    DWG_TYPE_VIEW_CONTROL = 60,
    DWG_TYPE_VIEW = 61,
    DWG_TYPE_UCS_CONTROL = 62,
    DWG_TYPE_UCS = 63,
    DWG_TYPE_VPORT_CONTROL = 64,
    DWG_TYPE_VPORT = 65,
    DWG_TYPE_APPID_CONTROL = 66,
    DWG_TYPE_APPID = 67,
    DWG_TYPE_DIMSTYLE_CONTROL = 68,
    DWG_TYPE_DIMSTYLE = 69,
    DWG_TYPE_VX_CONTROL = 70,
    DWG_TYPE_VX_TABLE_RECORD = 71,
    DWG_TYPE_GROUP = 72,
    DWG_TYPE_MLINESTYLE = 73,
    DWG_TYPE_OLE2FRAME = 74,
    DWG_TYPE_DUMMY = 75,
    DWG_TYPE_LONG_TRANSACTION = 76,
    DWG_TYPE_LWPOLYLINE = 77,
    DWG_TYPE_HATCH = 78,
    DWG_TYPE_XRECORD = 79,
    DWG_TYPE_PLACEHOLDER = 80,
    DWG_TYPE_VBA_PROJECT = 81,
    DWG_TYPE_LAYOUT = 82,
    DWG_TYPE_PROXY_ENTITY = 498,
    DWG_TYPE_PROXY_OBJECT = 499,
    DWG_TYPE_ACDSRECORD = 500,
    DWG_TYPE_ACDSSCHEMA = 501,
    DWG_TYPE_ACMECOMMANDHISTORY = 502,
    DWG_TYPE_ACMESCOPE = 503,
    DWG_TYPE_ACMESTATEMGR = 504,
    DWG_TYPE_ACSH_BOOLEAN_CLASS = 505,
    DWG_TYPE_ACSH_BOX_CLASS = 506,
    DWG_TYPE_ACSH_BREP_CLASS = 507,
    DWG_TYPE_ACSH_CHAMFER_CLASS = 508,
    DWG_TYPE_ACSH_CONE_CLASS = 509,
    DWG_TYPE_ACSH_CYLINDER_CLASS = 510,
    DWG_TYPE_ACSH_EXTRUSION_CLASS = 511,
    DWG_TYPE_ACSH_FILLET_CLASS = 512,
    DWG_TYPE_ACSH_HISTORY_CLASS = 513,
    DWG_TYPE_ACSH_LOFT_CLASS = 514,
    DWG_TYPE_ACSH_PYRAMID_CLASS = 515,
    DWG_TYPE_ACSH_REVOLVE_CLASS = 516,
    DWG_TYPE_ACSH_SPHERE_CLASS = 517,
    DWG_TYPE_ACSH_SWEEP_CLASS = 518,
    DWG_TYPE_ACSH_TORUS_CLASS = 519,
    DWG_TYPE_ACSH_WEDGE_CLASS = 520,
    DWG_TYPE_ALDIMOBJECTCONTEXTDATA = 521,
    DWG_TYPE_ALIGNMENTPARAMETERENTITY = 522,
    DWG_TYPE_ANGDIMOBJECTCONTEXTDATA = 523,
    DWG_TYPE_ANNOTSCALEOBJECTCONTEXTDATA = 524,
    DWG_TYPE_ARCALIGNEDTEXT = 525,
    DWG_TYPE_ARC_DIMENSION = 526,
    DWG_TYPE_ASSOC2DCONSTRAINTGROUP = 527,
    DWG_TYPE_ASSOC3POINTANGULARDIMACTIONBODY = 528,
    DWG_TYPE_ASSOCACTION = 529,
    DWG_TYPE_ASSOCACTIONPARAM = 530,
    DWG_TYPE_ASSOCALIGNEDDIMACTIONBODY = 531,
    DWG_TYPE_ASSOCARRAYACTIONBODY = 532,
    DWG_TYPE_ASSOCARRAYMODIFYACTIONBODY = 533,
    DWG_TYPE_ASSOCARRAYMODIFYPARAMETERS = 534,
    DWG_TYPE_ASSOCARRAYPATHPARAMETERS = 535,
    DWG_TYPE_ASSOCARRAYPOLARPARAMETERS = 536,
    DWG_TYPE_ASSOCARRAYRECTANGULARPARAMETERS = 537,
    DWG_TYPE_ASSOCASMBODYACTIONPARAM = 538,
    DWG_TYPE_ASSOCBLENDSURFACEACTIONBODY = 539,
    DWG_TYPE_ASSOCCOMPOUNDACTIONPARAM = 540,
    DWG_TYPE_ASSOCDEPENDENCY = 541,
    DWG_TYPE_ASSOCDIMDEPENDENCYBODY = 542,
    DWG_TYPE_ASSOCEDGEACTIONPARAM = 543,
    DWG_TYPE_ASSOCEDGECHAMFERACTIONBODY = 544,
    DWG_TYPE_ASSOCEDGEFILLETACTIONBODY = 545,
    DWG_TYPE_ASSOCEXTENDSURFACEACTIONBODY = 546,
    DWG_TYPE_ASSOCEXTRUDEDSURFACEACTIONBODY = 547,
    DWG_TYPE_ASSOCFACEACTIONPARAM = 548,
    DWG_TYPE_ASSOCFILLETSURFACEACTIONBODY = 549,
    DWG_TYPE_ASSOCGEOMDEPENDENCY = 550,
    DWG_TYPE_ASSOCLOFTEDSURFACEACTIONBODY = 551,
    DWG_TYPE_ASSOCMLEADERACTIONBODY = 552,
    DWG_TYPE_ASSOCNETWORK = 553,
    DWG_TYPE_ASSOCNETWORKSURFACEACTIONBODY = 554,
    DWG_TYPE_ASSOCOBJECTACTIONPARAM = 555,
    DWG_TYPE_ASSOCOFFSETSURFACEACTIONBODY = 556,
    DWG_TYPE_ASSOCORDINATEDIMACTIONBODY = 557,
    DWG_TYPE_ASSOCOSNAPPOINTREFACTIONPARAM = 558,
    DWG_TYPE_ASSOCPATCHSURFACEACTIONBODY = 559,
    DWG_TYPE_ASSOCPATHACTIONPARAM = 560,
    DWG_TYPE_ASSOCPERSSUBENTMANAGER = 561,
    DWG_TYPE_ASSOCPLANESURFACEACTIONBODY = 562,
    DWG_TYPE_ASSOCPOINTREFACTIONPARAM = 563,
    DWG_TYPE_ASSOCRESTOREENTITYSTATEACTIONBODY = 564,
    DWG_TYPE_ASSOCREVOLVEDSURFACEACTIONBODY = 565,
    DWG_TYPE_ASSOCROTATEDDIMACTIONBODY = 566,
    DWG_TYPE_ASSOCSWEPTSURFACEACTIONBODY = 567,
    DWG_TYPE_ASSOCTRIMSURFACEACTIONBODY = 568,
    DWG_TYPE_ASSOCVALUEDEPENDENCY = 569,
    DWG_TYPE_ASSOCVARIABLE = 570,
    DWG_TYPE_ASSOCVERTEXACTIONPARAM = 571,
    DWG_TYPE_BASEPOINTPARAMETERENTITY = 572,
    DWG_TYPE_BLKREFOBJECTCONTEXTDATA = 573,
    DWG_TYPE_BLOCKALIGNEDCONSTRAINTPARAMETER = 574,
    DWG_TYPE_BLOCKALIGNMENTGRIP = 575,
    DWG_TYPE_BLOCKALIGNMENTPARAMETER = 576,
    DWG_TYPE_BLOCKANGULARCONSTRAINTPARAMETER = 577,
    DWG_TYPE_BLOCKARRAYACTION = 578,
    DWG_TYPE_BLOCKBASEPOINTPARAMETER = 579,
    DWG_TYPE_BLOCKDIAMETRICCONSTRAINTPARAMETER = 580,
    DWG_TYPE_BLOCKFLIPACTION = 581,
    DWG_TYPE_BLOCKFLIPGRIP = 582,
    DWG_TYPE_BLOCKFLIPPARAMETER = 583,
    DWG_TYPE_BLOCKGRIPLOCATIONCOMPONENT = 584,
    DWG_TYPE_BLOCKHORIZONTALCONSTRAINTPARAMETER = 585,
    DWG_TYPE_BLOCKLINEARCONSTRAINTPARAMETER = 586,
    DWG_TYPE_BLOCKLINEARGRIP = 587,
    DWG_TYPE_BLOCKLINEARPARAMETER = 588,
    DWG_TYPE_BLOCKLOOKUPACTION = 589,
    DWG_TYPE_BLOCKLOOKUPGRIP = 590,
    DWG_TYPE_BLOCKLOOKUPPARAMETER = 591,
    DWG_TYPE_BLOCKMOVEACTION = 592,
    DWG_TYPE_BLOCKPARAMDEPENDENCYBODY = 593,
    DWG_TYPE_BLOCKPOINTPARAMETER = 594,
    DWG_TYPE_BLOCKPOLARGRIP = 595,
    DWG_TYPE_BLOCKPOLARPARAMETER = 596,
    DWG_TYPE_BLOCKPOLARSTRETCHACTION = 597,
    DWG_TYPE_BLOCKPROPERTIESTABLE = 598,
    DWG_TYPE_BLOCKPROPERTIESTABLEGRIP = 599,
    DWG_TYPE_BLOCKRADIALCONSTRAINTPARAMETER = 600,
    DWG_TYPE_BLOCKREPRESENTATION = 601,
    DWG_TYPE_BLOCKROTATEACTION = 602,
    DWG_TYPE_BLOCKROTATIONGRIP = 603,
    DWG_TYPE_BLOCKROTATIONPARAMETER = 604,
    DWG_TYPE_BLOCKSCALEACTION = 605,
    DWG_TYPE_BLOCKSTRETCHACTION = 606,
    DWG_TYPE_BLOCKUSERPARAMETER = 607,
    DWG_TYPE_BLOCKVERTICALCONSTRAINTPARAMETER = 608,
    DWG_TYPE_BLOCKVISIBILITYGRIP = 609,
    DWG_TYPE_BLOCKVISIBILITYPARAMETER = 610,
    DWG_TYPE_BLOCKXYGRIP = 611,
    DWG_TYPE_BLOCKXYPARAMETER = 612,
    DWG_TYPE_CAMERA = 613,
    DWG_TYPE_CELLSTYLEMAP = 614,
    DWG_TYPE_CONTEXTDATAMANAGER = 615,
    DWG_TYPE_CSACDOCUMENTOPTIONS = 616,
    DWG_TYPE_CURVEPATH = 617,
    DWG_TYPE_DATALINK = 618,
    DWG_TYPE_DATATABLE = 619,
    DWG_TYPE_DBCOLOR = 620,
    DWG_TYPE_DETAILVIEWSTYLE = 621,
    DWG_TYPE_DGNDEFINITION = 622,
    DWG_TYPE_DGNUNDERLAY = 623,
    DWG_TYPE_DICTIONARYVAR = 624,
    DWG_TYPE_DICTIONARYWDFLT = 625,
    DWG_TYPE_DIMASSOC = 626,
    DWG_TYPE_DMDIMOBJECTCONTEXTDATA = 627,
    DWG_TYPE_DWFDEFINITION = 628,
    DWG_TYPE_DWFUNDERLAY = 629,
    DWG_TYPE_DYNAMICBLOCKPROXYNODE = 630,
    DWG_TYPE_DYNAMICBLOCKPURGEPREVENTER = 631,
    DWG_TYPE_EVALUATION_GRAPH = 632,
    DWG_TYPE_EXTRUDEDSURFACE = 633,
    DWG_TYPE_FCFOBJECTCONTEXTDATA = 634,
    DWG_TYPE_FIELD = 635,
    DWG_TYPE_FIELDLIST = 636,
    DWG_TYPE_FLIPPARAMETERENTITY = 637,
    DWG_TYPE_FLIPACTIONENTITY = 638,// AcDbBlockFlipActionEntity,
    DWG_TYPE_GEODATA = 639,
    DWG_TYPE_GEOMAPIMAGE = 640,
    DWG_TYPE_GEOPOSITIONMARKER = 641,
    DWG_TYPE_GRADIENT_BACKGROUND = 642,
    DWG_TYPE_GROUND_PLANE_BACKGROUND = 643,
    DWG_TYPE_HELIX = 644,
    DWG_TYPE_IBL_BACKGROUND = 645,
    DWG_TYPE_IDBUFFER = 646,
    DWG_TYPE_IMAGE = 647,
    DWG_TYPE_IMAGEDEF = 648,
    DWG_TYPE_IMAGEDEF_REACTOR = 649,
    DWG_TYPE_IMAGE_BACKGROUND = 650,
    DWG_TYPE_INDEX = 651,
    DWG_TYPE_LARGE_RADIAL_DIMENSION = 652,
    DWG_TYPE_LAYERFILTER = 653,
    DWG_TYPE_LAYER_INDEX = 654,
    DWG_TYPE_LAYOUTPRINTCONFIG = 655,
    DWG_TYPE_LEADEROBJECTCONTEXTDATA = 656,
    DWG_TYPE_LIGHT = 657,
    DWG_TYPE_LIGHTLIST = 658,
    DWG_TYPE_LINEARPARAMETERENTITY = 659,
    DWG_TYPE_LOFTEDSURFACE = 660,
    DWG_TYPE_MATERIAL = 661,
    DWG_TYPE_MENTALRAYRENDERSETTINGS = 662,
    DWG_TYPE_MESH = 663,
    DWG_TYPE_MLEADEROBJECTCONTEXTDATA = 664,
    DWG_TYPE_MLEADERSTYLE = 665,
    DWG_TYPE_MOVEACTIONENTITY = 666,
    DWG_TYPE_MOTIONPATH = 667,
    DWG_TYPE_MPOLYGON = 668,
    DWG_TYPE_MTEXTATTRIBUTEOBJECTCONTEXTDATA = 669,
    DWG_TYPE_MTEXTOBJECTCONTEXTDATA = 670,
    DWG_TYPE_MULTILEADER = 671,
    DWG_TYPE_NAVISWORKSMODEL = 672,
    DWG_TYPE_NAVISWORKSMODELDEF = 673,
    DWG_TYPE_NPOCOLLECTION = 674,
    DWG_TYPE_NURBSURFACE = 675,
    DWG_TYPE_OBJECT_PTR = 676,
    DWG_TYPE_ORDDIMOBJECTCONTEXTDATA = 677,
    DWG_TYPE_PARTIAL_VIEWING_INDEX = 678,
    DWG_TYPE_PDFDEFINITION = 679,
    DWG_TYPE_PDFUNDERLAY = 680,
    DWG_TYPE_PERSUBENTMGR = 681,
    DWG_TYPE_PLANESURFACE = 682,
    DWG_TYPE_PLOTSETTINGS = 683,
    DWG_TYPE_POINTCLOUD = 684,
    DWG_TYPE_POINTCLOUDCOLORMAP = 685,
    DWG_TYPE_POINTCLOUDDEF = 686,
    DWG_TYPE_POINTCLOUDDEFEX = 687,
    DWG_TYPE_POINTCLOUDDEF_REACTOR = 688,
    DWG_TYPE_POINTCLOUDDEF_REACTOR_EX = 689,
    DWG_TYPE_POINTCLOUDEX = 690,
    DWG_TYPE_POINTPARAMETERENTITY = 691,
    DWG_TYPE_POINTPATH = 692,
    DWG_TYPE_POLARGRIPENTITY = 693,
    DWG_TYPE_RADIMLGOBJECTCONTEXTDATA = 694,
    DWG_TYPE_RADIMOBJECTCONTEXTDATA = 695,
    DWG_TYPE_RAPIDRTRENDERSETTINGS = 696,
    DWG_TYPE_RASTERVARIABLES = 697,
    DWG_TYPE_RENDERENTRY = 698,
    DWG_TYPE_RENDERENVIRONMENT = 699,
    DWG_TYPE_RENDERGLOBAL = 700,
    DWG_TYPE_RENDERSETTINGS = 701,
    DWG_TYPE_REVOLVEDSURFACE = 702,
    DWG_TYPE_ROTATIONPARAMETERENTITY = 703,
    DWG_TYPE_ROTATEACTIONENTITY = 704,
    DWG_TYPE_RTEXT = 705,
    DWG_TYPE_SCALE = 706,
    DWG_TYPE_SCALEACTIONENTITY = 707,
    DWG_TYPE_SECTIONOBJECT = 708,
    DWG_TYPE_SECTIONVIEWSTYLE = 709,
    DWG_TYPE_SECTION_MANAGER = 710,
    DWG_TYPE_SECTION_SETTINGS = 711,
    DWG_TYPE_SKYLIGHT_BACKGROUND = 712,
    DWG_TYPE_SOLID_BACKGROUND = 713,
    DWG_TYPE_SORTENTSTABLE = 714,
    DWG_TYPE_SPATIAL_FILTER = 715,
    DWG_TYPE_SPATIAL_INDEX = 716,
    DWG_TYPE_STRETCHACTIONENTITY = 717,
    DWG_TYPE_SUN = 718,
    DWG_TYPE_SUNSTUDY = 719,
    DWG_TYPE_SWEPTSURFACE = 720,
    DWG_TYPE_TABLE = 721,
    DWG_TYPE_TABLECONTENT = 722,
    DWG_TYPE_TABLEGEOMETRY = 723,
    DWG_TYPE_TABLESTYLE = 724,
    DWG_TYPE_TEXTOBJECTCONTEXTDATA = 725,
    DWG_TYPE_TVDEVICEPROPERTIES = 726,
    DWG_TYPE_VISIBILITYGRIPENTITY = 727,
    DWG_TYPE_VISIBILITYPARAMETERENTITY = 728,
    DWG_TYPE_VISUALSTYLE = 729,
    DWG_TYPE_WIPEOUT = 730,
    DWG_TYPE_WIPEOUTVARIABLES = 731,
    DWG_TYPE_XREFPANELOBJECT = 732,
    DWG_TYPE_XYPARAMETERENTITY = 733,
    DWG_TYPE_BREAKDATA = 734,
    DWG_TYPE_BREAKPOINTREF = 735,
    DWG_TYPE_FLIPGRIPENTITY = 736,
    DWG_TYPE_LINEARGRIPENTITY = 737,
    DWG_TYPE_ROTATIONGRIPENTITY = 738,
    DWG_TYPE_XYGRIPENTITY = 739,
    DWG_TYPE__3DLINE = 740,
    DWG_TYPE_REPEAT = 741,
    DWG_TYPE_ENDREP = 742,
    DWG_TYPE_JUMP = 743,
    DWG_TYPE_LOAD = 744,
    DWG_TYPE_FREED = 65533,
    DWG_TYPE_UNKNOWN_ENT = 65534,
    DWG_TYPE_UNKNOWN_OBJ = 65535
}
/**
 * The object created by swapping keys and values of Dwg_Object_Type
 */
declare const Dwg_Object_Type_Inverted: {
    [k: string]: string;
};
declare enum Dwg_File_Type {
    DWG = 0,
    DXF = 1
}
declare enum Dwg_Hatch_Edge_Type {
    Line = 1,
    CircularArc = 2,
    EllipticArc = 3,
    Spline = 4
}

interface DwgHeader {
    /**
     * The AutoCAD drawing database version number:
     * - AC1006: R10
     * - AC1009: R11 and R12
     * - AC1012: R13
     * - AC1014: R14
     * - AC1015: AutoCAD 2000
     * - AC1018: AutoCAD 2004
     * - AC1021: AutoCAD 2007
     * - AC1024: AutoCAD 2010
     * - AC1027: AutoCAD 2013
     * - AC1032: AutoCAD 2018
     */
    ACADVER?: string;
    /**
     * The zero (0) base angle with respect to the current UCS.
     * Initial value:	0.0000
     */
    ANGBASE?: number;
    /**
     * The direction of positive angles
     * Initial value:	0
     * - 0: Counterclockwise angles
     * - 1: Clockwise angles
     */
    ANGDIR?: number;
    /**
     * Attribute visibility
     * Initial value:	1
     * - 0: Off: Makes all attributes invisible
     * - 1: Normal: Retains current visibility of each attribute; visible attributes are displayed; invisible attributes are not
     * - 2: On: Makes all attributes visible
     */
    ATTMODE?: number;
    /**
     * Units format for angles
     * Initial value:	0
     * - 0: Decimal degrees
     * - 1: Degrees/minutes/seconds
     * - 2: Gradians
     * - 3: Radians
     * - 4: Surveyor's units
     */
    AUNITS?: number;
    /**
     * The display precision for angular units and coordinates. However, the internal precision of angular
     * values and coordinates is always maintained, regardless of the display precision. AUPREC does not
     * affect the display precision of dimension text (see DIMSTYLE). Valid values are integers from 0 to 8.
     * Initial value:	0
     */
    AUPREC?: number;
    /**
     * Current entity color number
     * 0 = BYBLOCK; 256 = BYLAYER
     * Initial value:	256
     */
    CECOLOR?: Dwg_Color;
    /**
     * The linetype scaling for new objects relative to the LTSCALE command setting. A line created with
     * CELTSCALE = 2 in a drawing with LTSCALE set to 0.5 would appear the same as a line created with
     * CELTSCALE = 1 in a drawing with LTSCALE = 1.
     * Initial value:	1.0000
     */
    CELTSCALE?: number;
    /**
     * Entity linetype name, or BYBLOCK or BYLAYER
     * Initial value:	BYLAYER
     */
    CELTYPE?: string;
    /**
     * The lineweight of new objects.
     * Initial value:	-1
     * - -1: Sets the lineweight to "BYLAYER."
     * - -2: Sets the lineweight to "BYBLOCK."
     * - -3: Sets the lineweight to "DEFAULT." "DEFAULT" is controlled by the LWDEFAULT system variable.
     */
    CELWEIGHT?: number;
    /**
     * Plotstyle handle of new objects; if CEPSNTYPE is 3, then this value indicates the handle
     */
    CEPSNID?: number;
    /**
     * Plot style type of new objects:
     * - 0: Plot style by layer
     * - 1: Plot style by block
     * - 2: Plot style by dictionary default
     * - 3: Plot style by object ID/handle
     */
    CEPSNTYPE?: number;
    /**
     * The first chamfer distance
     * Initial value:	0.0000
     */
    CHAMFERA?: number;
    /**
     * The second chamfer distance
     * Initial value:	0.0000
     */
    CHAMFERB?: number;
    /**
     * Chamfer length
     */
    CHAMFERC?: number;
    /**
     * Chamfer angle
     */
    CHAMFERD?: number;
    /**
     * Current layer name
     * Initial value:	'0'
     */
    CLAYER?: string;
    /**
     * Current multiline justification
     * Initial value:	0
     * - 0: Top
     * - 1: Middle
     * - 2: Bottom
     */
    CMLJUST?: number;
    /**
     * Current multiline scale. A scale factor of 2.0 produces a multiline twice as wide as the style
     * definition. A zero scale factor collapses the multiline into a single line. A negative scale
     * factor flips the order of the offset lines (that is, the smallest or most negative is placed
     * on top when the multiline is drawn from left to right).
     * Initial value:	1.0000 (imperial) or 20.0000 (metric)
     */
    CMLSCALE?: number;
    /**
     * The multiline style that governs the appearance of the multiline.
     * Initial value:	'Standard'
     */
    CMLSTYLE?: string;
    /**
     * Shadow mode for a 3D object
     * - 0: Casts and receives shadows
     * - 1: Casts shadows
     * - 2: Receives shadows
     * - 3: Ignores shadows
     * Note: Starting with AutoCAD 2016-based products, this variable is obsolete but still supported for
     * backwards compatibility.
     */
    CSHADOW?: number;
    /**
     * The number of precision places displayed in angular dimensions
     * Initial value:	0
     * - -1: Angular dimensions display the number of decimal places specified by DIMDEC
     * - 0-8: Specifies the number of decimal places displayed in angular dimensions (independent of DIMDEC)
     */
    DIMADEC?: number;
    /**
     * The display of alternate units in dimensions.
     * Initial value:	0
     * - 0: Disables alternate units
     * - 1: Enables alternate units
     */
    DIMALT?: number;
    /**
     * The number of decimal places in alternate units. If DIMALT is turned on, DIMALTD sets the number of
     * digits displayed to the right of the decimal point in the alternate measurement.
     * Initial value:	2 (imperial) or 3 (metric)
     */
    DIMALTD?: number;
    /**
     * The multiplier for alternate units. If DIMALT is turned on, DIMALTF multiplies linear dimensions by
     * a factor to produce a value in an alternate system of measurement. The initial value represents the
     * number of millimeters in an inch.
     * Initial value:	25.4000 (imperial) or 0.0394 (metric)
     */
    DIMALTF?: number;
    /**
     * Rounds off the alternate dimension units.
     * Initial value:	0.0000
     */
    DIMALTRND?: number;
    /**
     * The number of decimal places for the tolerance values in the alternate units of a dimension.
     * Initial value:	2 (imperial) or 3 (metric)
     */
    DIMALTTD?: number;
    /**
     * Controls suppression of zeros for alternate tolerance values.
     * Initial value:	0
     * - 0: Suppresses zero feet and precisely zero inches
     * - 1: Includes zero feet and precisely zero inches
     * - 2: Includes zero feet and suppresses zero inches
     * - 3: Includes zero inches and suppresses zero feet
     *
     * To suppress leading or trailing zeros, add the following values to one of the preceding values:
     * - 4: Suppresses leading zeros
     * - 8: Suppresses trailing zeros
     */
    DIMALTTZ?: number;
    /**
     * Units format for alternate units of all dimension style family members except angular:
     * Initial value:	2
     * - 1: Scientific
     * - 2: Decimal
     * - 3: Engineering
     * - 4: Architectural (stacked)
     * - 5: Fractional (stacked)
     * - 6: Architectural
     * - 7: Fractional
     * - 8: Operating system defines the decimal separator and number grouping symbols
     */
    DIMALTU?: number;
    /**
     * Controls suppression of zeros for alternate unit dimension values.
     * Initial value:	0
     * - 0: Suppresses zero feet and precisely zero inches
     * - 1: Includes zero feet and precisely zero inches
     * - 2: Includes zero feet and suppresses zero inches
     * - 3: Includes zero inches and suppresses zero feet
     * - 4: Suppresses leading zeros in decimal dimensions
     * - 8: Suppresses trailing zeros in decimal dimensions
     * - 12: Suppresses both leading and trailing zeros
     */
    DIMALTZ?: number;
    /**
     * Specifies a text prefix or suffix (or both) to the alternate dimension measurement for all types of
     * dimensions except angular. For instance, if the current units are Architectural, DIMALT is on,
     * DIMALTF is 25.4 (the number of millimeters per inch), DIMALTD is 2, and DIMAPOST is set to "mm",
     * a distance of 10 units would be displayed as 10"[254.00mm].
     * To turn off an established prefix or suffix (or both), set it to a single period (.).
     * Initial value:	""
     */
    DIMAPOST?: number;
    /**
     * 1 = Create associative dimensioning
     * 0 = Draw individual entities
     * Note: Obsolete; see DIMASSOC.
     */
    DIMASO?: number;
    /**
     * Controls the associativity of dimension objects
     * Initial value:	2
     * - 0: Creates exploded dimensions; there is no association between elements of the dimension, and the lines, arcs, arrowheads, and text of a dimension are drawn as separate objects
     * - 1:  Creates non-associative dimension objects; the elements of the dimension are formed into a single object, and if the definition point on the object moves, then the dimension value is updated
     * - 2: Creates associative dimension objects; the elements of the dimension are formed into a single object and one or more definition points of the dimension are coupled with association points on geometric objects
     */
    DIMASSOC?: number;
    /**
     * Controls the size of dimension line and leader line arrowheads. Also controls the size of hook lines.
     * Multiples of the arrowhead size determine whether dimension lines and text should fit between the
     * extension lines. DIMASZ is also used to scale arrowhead blocks if set by DIMBLK. DIMASZ has no effect
     * when DIMTSZ is other than zero.
     * Initial value:	0.1800 (imperial) or 2.5000 (metric)
     */
    DIMASZ?: number;
    /**
     * Determines how dimension text and arrows are arranged when space is not sufficient to place both within
     * the extension lines.
     * Initial value:	3
     * - 0: Places both text and arrows outside extension lines
     * - 1: Moves arrows first, then text
     * - 2: Moves text first, then arrows
     * - 3: Moves either text or arrows, whichever fits best
     */
    DIMATFIT?: number;
    /**
     * Angle format for angular dimensions
     * Initial value:	0
     * - 0: Decimal degrees
     * - 1: Degrees/minutes/seconds
     * - 2: Gradians
     * - 3: Radians
     * - 4: Surveyor's units
     */
    DIMAUNIT?: number;
    /**
     * Suppresses zeros for angular dimensions
     * Initial value:	0
     * - 0: Displays all leading and trailing zeros
     * - 1: Suppresses leading zeros in decimal dimensions (for example, 0.5000 becomes .5000)
     * - 2: Suppresses trailing zeros in decimal dimensions (for example, 12.5000 becomes 12.5)
     * - 3: Suppresses leading and trailing zeros (for example, 0.5000 becomes .5)
     */
    DIMAZIN?: number;
    /**
     * Sets the arrowhead block displayed at the ends of dimension lines.
     * To return to the default, closed-filled arrowhead display, enter a single period (.).
     * Arrowhead block entries and the names used to select them in the New, Modify, and Override
     * Dimension Style dialog boxes are shown below. You can also enter the names of user-defined
     * arrowhead blocks.
     * Initial value:	""
     * - "": closed filled
     * - "_DOT": dot
     * - "_DOTSMALL": dot small
     * - "_DOTBLANK": dot blank
     * - "_ORIGIN": origin indicator
     * - "_ORIGIN2": origin indicator 2
     * - "_OPEN": open
     * - "_OPEN90": right angle
     * - "_OPEN30": open 30
     * - "_CLOSED": closed
     * - "_SMALL": dot small blank
     * - "_NONE": none
     * - "_OBLIQUE": oblique
     * - "_BOXFILLED": box filled
     * - "_BOXBLANK": box
     * - "_CLOSEDBLANK": closed blank
     * - "_DATUMFILLED": datum triangle filled
     * - "_DATUMBLANK": datum triangle
     * - "_INTEGRAL": integral
     * - "_ARCHTICK": architectural tick
     */
    DIMBLK?: string;
    /**
     * The arrowhead for the first end of the dimension line when DIMSAH is on.
     * Initial value:	""
     */
    DIMBLK1?: string;
    /**
     * The arrowhead for the second end of the dimension line when DIMSAH is on.
     * Initial value:	""
     */
    DIMBLK2?: string;
    /**
     * Controls drawing of circle or arc center marks and centerlines by the DIMCENTER, DIMDIAMETER, and DIMRADIUS commands.
     * Initial value:	0.0900 (imperial) or 2.5000 (metric)
     * - 0: No center marks or lines are drawn
     * - <0: Centerlines are drawn
     * - >0: Center marks are drawn
     */
    DIMCEN?: number;
    /**
     * Dimension line color: range is 0 = BYBLOCK; 256 = BYLAYER
     * Initial value:	0
     */
    DIMCLRD?: number;
    /**
     * Dimension extension line color
     * - 0 = BYBLOCK
     * - 256 = BYLAYER
     */
    DIMCLRE?: number;
    /**
     * Dimension text color
     * - 0 = BYBLOCK
     * - 256 = BYLAYER
     */
    DIMCLRT?: number;
    /**
     * Number of decimal places for the tolerance values of a primary units dimension
     */
    DIMDEC?: number;
    /**
     * Dimension line extension
     */
    DIMDLE?: number;
    /**
     * Dimension line increment
     */
    DIMDLI?: number;
    /**
     * Single-character decimal separator used when creating dimensions whose unit format is decimal
     */
    DIMDSEP?: string;
    /**
     * Extension line extension
     */
    DIMEXE?: number;
    /**
     * Extension line offset
     */
    DIMEXO?: number;
    /**
     * Scale factor used to calculate the height of text for dimension fractions and tolerances
     */
    DIMFAC?: number;
    /**
     * Dimension line gap
     */
    DIMGAP?: number;
    /**
     * Horizontal dimension text position
     * - 0 = Above dimension line and center-justified between extension lines
     * - 1 = Above dimension line and next to first extension line
     * - 2 = Above dimension line and next to second extension line
     * - 3 = Above and center-justified to first extension line
     * - 4 = Above and center-justified to second extension line
     */
    DIMJUST?: number;
    /**
     * Arrow block name for leaders
     */
    DIMLDRBLK?: string;
    /**
     * Linear measurements scale factor
     */
    DIMLFAC?: number;
    /**
     * Dimension limits generated if nonzero
     */
    DIMLIM?: number;
    /**
     * Sets units for all dimension types except Angular
     * - 1 = Scientific
     * - 2 = Decimal
     * - 3 = Engineering
     * - 4 = Architectural
     * - 5 = Fractional
     * - 6 = Operating system
     */
    DIMLUNIT?: number;
    /**
     * Dimension line lineweight
     * - -3 = Standard
     * - -2 = ByLayer
     * - -1 = ByBlock
     * - 0-211 = 100th of mm
     */
    DIMLWD?: number;
    /**
     * Extension line lineweight
     * - -3 = Standard
     * - -2 = ByLayer
     * - -1 = ByBlock
     * - 0-211 = 100th of mm
     */
    DIMLWE?: number;
    /**
     * General dimensioning suffix
     */
    DIMPOST?: string;
    /**
     * Rounding value for dimension distances
     */
    DIMRND?: number;
    /**
     * Use separate arrow blocks if nonzero
     */
    DIMSAH?: number;
    /**
     * Overall dimensioning scale factor
     */
    DIMSCALE?: number;
    /**
     * Suppression of first extension line
     * - 0 = Not suppressed
     * - 1 = Suppressed
     */
    DIMSD1?: number;
    /**
     * Suppression of second extension line
     * - 0 = Not suppressed
     * - 1 = Suppressed
     */
    DIMSD2?: number;
    /**
     * First extension line suppressed if nonzero
     */
    DIMSE1?: number;
    /**
     * Second extension line suppressed if nonzero
     */
    DIMSE2?: number;
    /**
     * Recompute dimensions while dragging
     * - 0 = Drag original image
     * - 1 = Recompute
     */
    DIMSHO?: number;
    /**
     * Suppress outside-extensions dimension lines if nonzero
     */
    DIMSOXD?: number;
    /**
     * Dimension style name
     */
    DIMSTYLE?: string;
    /**
     * Text above dimension line if nonzero
     */
    DIMTAD?: number;
    /**
     * Number of decimal places to display the tolerance values
     */
    DIMTDEC?: number;
    /**
     * Dimension tolerance display scale factor
     */
    DIMTFAC?: number;
    /**
     * Text inside horizontal if nonzero
     */
    DIMTIH?: number;
    /**
     * Force text inside extensions if nonzero
     */
    DIMTIX?: number;
    /**
     * Minus tolerance
     */
    DIMTM?: number;
    /**
     * Dimension text movement rules
     * - 0 = Moves the dimension line with dimension text
     * - 1 = Adds a leader when dimension text is moved
     * - 2 = Allows text to be moved freely without a leader
     */
    DIMTMOVE?: number;
    /**
     * If text is outside the extension lines, dimension lines are forced between the extension lines if nonzero
     */
    DIMTOFL?: number;
    /**
     * Text outside horizontal if nonzero
     */
    DIMTOH?: number;
    /**
     * Dimension tolerances generated if nonzero
     */
    DIMTOL?: number;
    /**
     * Vertical justification for tolerance values
     * - 0 = Top
     * - 1 = Middle
     * - 2 = Bottom
     */
    DIMTOLJ?: number;
    /**
     * Plus tolerance
     */
    DIMTP?: number;
    /**
     * Dimensioning tick size
     * - 0 = Draws arrowheads
     * - >0 = Draws oblique strokes
     */
    DIMTSZ?: number;
    /**
     * Text vertical position
     */
    DIMTVP?: number;
    /**
     * Dimension text style
     */
    DIMTXSTY?: string;
    /**
     * Dimensioning text height
     */
    DIMTXT?: number;
    /**
     * Controls suppression of zeros for tolerance values
     * - 0 = Suppresses zero feet and precisely zero inches
     * - 1 = Includes zero feet and precisely zero inches
     * - 2 = Includes zero feet and suppresses zero inches
     * - 3 = Includes zero inches and suppresses zero feet
     * - 4 = Suppresses leading zeros in decimal dimensions
     * - 8 = Suppresses trailing zeros in decimal dimensions
     * - 12 = Suppresses both leading and trailing zeros
     */
    DIMTZIN?: number;
    /**
     * Cursor functionality for user-positioned text
     * - 0 = Controls only the dimension line location
     * - 1 = Controls the text position as well
     */
    DIMUPT?: number;
    /**
     * Controls suppression of zeros for primary unit values
     * - 0 = Suppresses zero feet and precisely zero inches
     * - 1 = Includes zero feet and precisely zero inches
     * - 2 = Includes zero feet and suppresses zero inches
     * - 3 = Includes zero inches and suppresses zero feet
     * - 4 = Suppresses leading zeros in decimal dimensions
     * - 8 = Suppresses trailing zeros in decimal dimensions
     * - 12 = Suppresses both leading and trailing zeros
     */
    DIMZIN?: number;
    /**
     * Controls the display of silhouette curves of body objects in Wireframe mode
     * - 0 = Off
     * - 1 = On
     */
    DISPSILH?: number;
    /**
     * Hard-pointer ID to visual style while creating 3D solid primitives. The default value is NULL
     */
    DRAGVS?: string | null;
    /**
     * Drawing code page; set to the system code page when a new drawing is created
     */
    DWGCODEPAGE?: string;
    /**
     * Current elevation set by ELEV command
     */
    ELEVATION?: number;
    /**
     * Lineweight endcaps setting for new objects
     * - 0 = None
     * - 1 = Round
     * - 2 = Angle
     * - 3 = Square
     */
    ENDCAPS?: number;
    /**
     * X, Y, and Z drawing extents upper-right corner (in WCS)
     */
    EXTMAX?: DwgPoint3D;
    /**
     * X, Y, and Z drawing extents lower-left corner (in WCS)
     */
    EXTMIN?: DwgPoint3D;
    /**
     * Controls symbol table naming
     * - 0 = AutoCAD Release 14 compatibility
     * - 1 = AutoCAD 2000
     */
    EXTNAMES?: number;
    /**
     * Fillet radius
     */
    FILLETRAD?: number;
    /**
     * Fill mode on if nonzero
     */
    FILLMODE?: number;
    /**
     * Set at creation time, uniquely identifies a particular drawing
     */
    FINGERPRINTGUID?: string;
    /**
     * Specifies a gap to be displayed where an object is hidden by another object
     */
    HALOGAP?: number;
    /**
     * Next available handle
     */
    HANDSEED?: string;
    /**
     * Specifies HIDETEXT system variable
     * - 0 = HIDE ignores text objects
     * - 1 = HIDE does not ignore text objects
     */
    HIDETEXT?: number;
    /**
     * Path for all relative hyperlinks in the drawing
     */
    HYPERLINKBASE?: string;
    /**
     * Controls whether layer and spatial indexes are created and saved in drawing files
     * - 0 = No indexes are created
     * - 1 = Layer index is created
     * - 2 = Spatial index is created
     * - 3 = Layer and spatial indexes are created
     */
    INDEXCTL?: number;
    /**
     * Insertion base set by BASE command (in WCS)
     */
    INSBASE?: string;
    /**
     * Default drawing units for AutoCAD DesignCenter blocks
     * - 0: Unitless
     * - 1: Inches
     * - 2: Feet
     * - 3: Miles
     * - 4: Millimeters
     * - 5: Centimeters
     * - 6: Meters
     * - 7: Kilometers
     * - 8: Microinches
     * - 9: Mils
     * - 10: Yards
     * - 11: Angstroms
     * - 12: Nanometers
     * - 13: Microns
     * - 14: Decimeters
     * - 15: Decameters
     * - 16: Hectometers
     * - 17: Gigameters
     * - 18: Astronomical units
     * - 19: Light years
     * - 20: Parsecs
     * - 21: US Survey Feet
     * - 22: US Survey Inch
     * - 23: US Survey Yard
     * - 24: US Survey Mile
     */
    INSUNITS?: number;
    /**
     * Represents the ACI color index of the "interference objects" created during the INTERFERE command
     * Default value is 1
     */
    INTERFERECOLOR?: number;
    /**
     * Hard-pointer ID to the visual style for interference objects
     * Default visual style is Conceptual
     */
    INTERFEREOBJVS?: string;
    /**
     * Hard-pointer ID to the visual style for the viewport during interference checking
     * Default visual style is 3d Wireframe
     */
    INTERFEREVPVS?: string;
    /**
     * Specifies the entity color of intersection polylines
     * Values 1-255 designate an AutoCAD color index (ACI)
     * 0 = Color BYBLOCK
     * 256 = Color BYLAYER
     * 257 = Color BYENTITY
     */
    INTERSECTIONCOLOR?: number;
    /**
     * Specifies the display of intersection polylines
     * - 0: Turns off the display of intersection polylines
     * - 1: Turns on the display of intersection polylines
     */
    INTERSECTIONDISPLAY?: number;
    /**
     * Lineweight joint setting for new objects
     * - 0: None
     * - 1: Round
     * - 2: Angle
     * - 3: Flat
     */
    JOINSTYLE?: number;
    /**
     * Nonzero if limits checking is on
     */
    LIMCHECK?: number;
    /**
     * XY drawing limits upper-right corner (in WCS)
     */
    LIMMAX?: string;
    /**
     * XY drawing limits lower-left corner (in WCS)
     */
    LIMMIN?: string;
    /**
     * Global linetype scale
     */
    LTSCALE?: number;
    /**
     * Units format for coordinates and distances
     */
    LUNITS?: number;
    /**
     * Units precision for coordinates and distances
     */
    LUPREC?: number;
    /**
     * Controls the display of lineweights on the Model or Layout tab
     * - 0: Lineweight is not displayed
     * - 1: Lineweight is displayed
     */
    LWDISPLAY?: number;
    /**
     * Sets maximum number of viewports to be regenerated
     */
    MAXACTVP?: number;
    /**
     * Sets drawing units
     * - 0: English
     * - 1: Metric
     */
    MEASUREMENT?: number;
    /**
     * Name of menu file
     */
    MENU?: string;
    /**
     * Mirror text if nonzero
     */
    MIRRTEXT?: number;
    /**
     * Specifies the color of obscured lines
     * - 0 and 256: Entity color
     * - 1-255: An AutoCAD color index (ACI)
     */
    OBSCOLOR?: number;
    /**
     * Specifies the linetype of obscured lines
     * - 0: Off
     * - 1: Solid
     * - 2: Dashed
     * - 3: Dotted
     * - 4: Short Dash
     * - 5: Medium Dash
     * - 6: Long Dash
     * - 7: Double Short Dash
     * - 8: Double Medium Dash
     * - 9: Double Long Dash
     * - 10: Medium Long Dash
     * - 11: Sparse Dot
     */
    OBSLTYPE?: number;
    /**
     * Ortho mode on if nonzero
     */
    ORTHOMODE?: number;
    /**
     * Point display mode
     */
    PDMODE?: number;
    /**
     * Point display size
     */
    PDSIZE?: number;
    /**
     * Current paper space elevation
     */
    PELEVATION?: number;
    /**
     * Maximum X, Y, and Z extents for paper space
     */
    PEXTMAX?: string;
    /**
     * Minimum X, Y, and Z extents for paper space
     */
    PEXTMIN?: string;
    /**
     * Paper space insertion base point
     */
    PINSBASE?: string;
    /**
     * Limits checking in paper space when nonzero
     */
    PLIMCHECK?: number;
    /**
     * Maximum X and Y limits in paper space
     */
    PLIMMAX?: string;
    /**
     * Minimum X and Y limits in paper space
     */
    PLIMMIN?: string;
    /**
     * Governs the generation of linetype patterns around the vertices of a 2D polyline
     * - 1: Linetype is generated in a continuous pattern around vertices of the polyline
     * - 0: Each segment of the polyline starts and ends with a dash
     */
    PLINEGEN?: number;
    /**
     * Default polyline width
     */
    PLINEWID?: number;
    /**
     * Assigns a project name to the current drawing
     */
    PROJECTNAME?: string;
    /**
     * Controls the saving of proxy object images
     */
    PROXYGRAPHICS?: number;
    /**
     * Controls paper space linetype scaling
     * - 1: No special linetype scaling
     * - 0: Viewport scaling governs linetype scaling
     */
    PSLTSCALE?: number;
    /**
     * Indicates whether the current drawing is in a Color-Dependent or Named Plot Style mode
     * - 0: Uses named plot style tables in the current drawing
     * - 1: Uses color-dependent plot style tables in the current drawing
     */
    PSTYLEMODE?: number;
    /**
     * View scale factor for new viewports
     * - 0: Scaled to fit
     * - >0: Scale factor (a positive real value)
     */
    PSVPSCALE?: number;
    /**
     * Name of the UCS that defines the origin and orientation of orthographic UCS settings (paper space only)
     */
    PUCSBASE?: string;
    /**
     * Current paper space UCS name
     */
    PUCSNAME?: string;
    /**
     * Current paper space UCS origin
     */
    PUCSORG?: string;
    /**
     * Point which becomes the new UCS origin after changing paper space UCS to BACK when PUCSBASE is set to WORLD
     */
    PUCSORGBACK?: string;
    /**
     * Point which becomes the new UCS origin after changing paper space UCS to BOTTOM when PUCSBASE is set to WORLD
     */
    PUCSORGBOTTOM?: string;
    /**
     * Point which becomes the new UCS origin after changing paper space UCS to FRONT when PUCSBASE is set to WORLD
     */
    PUCSORGFRONT?: string;
    /**
     * Point which becomes the new UCS origin after changing paper space UCS to LEFT when PUCSBASE is set to WORLD
     */
    PUCSORGLEFT?: string;
    /**
     * Point which becomes the new UCS origin after changing paper space UCS to RIGHT when PUCSBASE is set to WORLD
     */
    PUCSORGRIGHT?: string;
    /**
     * Point which becomes the new UCS origin after changing paper space UCS to TOP when PUCSBASE is set to WORLD
     */
    PUCSORGTOP?: string;
    /**
     * If paper space UCS is orthographic (PUCSORTHOVIEW not equal to 0), this is the name of the UCS that the orthographic UCS is relative to
     */
    PUCSORTHOREF?: string;
    /**
     * Orthographic view type of paper space UCS
     * - 0: UCS is not orthographic
     * - 1: Top
     * - 2: Bottom
     * - 3: Front
     * - 4: Back
     * - 5: Left
     * - 6: Right
     */
    PUCSORTHOVIEW?: number;
    /**
     * Current paper space UCS X axis
     */
    PUCSXDIR?: number;
    /**
     * Current paper space UCS Y axis
     */
    PUCSYDIR?: number;
    /**
     * Quick Text mode on if nonzero
     */
    QTEXTMODE?: number;
    /**
     * REGENAUTO mode on if nonzero
     */
    REGENMODE?: number;
    /**
     * Controls the shading of edges
     * - 0: Faces shaded, edges not highlighted
     * - 1: Faces shaded, edges highlighted in black
     * - 2: Faces not filled, edges in entity color
     * - 3: Faces in entity color, edges in black
     */
    SHADEDGE?: number;
    /**
     * Percent ambient/diffuse light; range 1-100; default 70
     */
    SHADEDIF?: number;
    /**
     * Location of the ground shadow plane. This is a Z axis ordinate.
     */
    SHADOWPLANELOCATION?: number;
    /**
     * Sketch record increment
     */
    SKETCHINC?: number;
    /**
     * Determines the object type created by the SKETCH command
     * - 0: Generates lines
     * - 1: Generates polylines
     * - 2: Generates splines
     */
    SKPOLY?: number;
    /**
     * Controls the object sorting methods; accessible from the Options dialog box User Preferences tab. SORTENTS uses the following bitcodes
     * - 0: Disables SORTENTS
     * - 1: Sorts for object selection
     * - 2: Sorts for object snap
     * - 4: Sorts for redraws; obsolete
     * - 8: Sorts for MSLIDE command slide creation; obsolete
     * - 16: Sorts for REGEN commands
     * - 32: Sorts for plotting
     * - 64: Sorts for PostScript output; obsolete
     */
    SORTENTS?: number;
    /**
     * Number of line segments per spline patch
     */
    SPLINESEGS?: number;
    /**
     * Spline curve type for PEDIT Spline
     */
    SPLINETYPE?: number;
    /**
     * Number of mesh tabulations in first direction
     */
    SURFTAB1?: number;
    /**
     * Number of mesh tabulations in second direction
     */
    SURFTAB2?: number;
    /**
     * Surface type for PEDIT Smooth
     */
    SURFTYPE?: number;
    /**
     * Surface density (for PEDIT Smooth) in M direction
     */
    SURFU?: number;
    /**
     * Surface density (for PEDIT Smooth) in N direction
     */
    SURFV?: number;
    /**
     * Local date/time of drawing creation
     */
    TDCREATE?: Date;
    /**
     * Cumulative editing time for this drawing
     */
    TDINDWG?: number;
    /**
     * Universal date/time the drawing was created
     */
    TDUCREATE?: Date;
    /**
     * Local date/time of last drawing update
     */
    TDUPDATE?: Date;
    /**
     * User-elapsed timer
     */
    TDUSRTIMER?: number;
    /**
     * Universal date/time of the last update/save
     */
    TDUUPDATE?: Date;
    /**
     * Default text height
     */
    TEXTSIZE?: number;
    /**
     * Current text style name
     */
    TEXTSTYLE?: string;
    /**
     * Current thickness set by ELEV command
     */
    THICKNESS?: number;
    /**
     * 1 for previous release compatibility mode; 0 otherwise
     */
    TILEMODE?: number;
    /**
     * Default trace width
     */
    TRACEWID?: number;
    /**
     * Specifies the maximum depth of the spatial index
     */
    TREEDEPTH?: number;
    /**
     * Name of the UCS that defines the origin and orientation of orthographic UCS settings
     */
    UCSBASE?: string;
    /**
     * Name of current UCS
     */
    UCSNAME?: string;
    /**
     * Origin of current UCS (in WCS)
     */
    UCSORG?: DwgPoint3D;
    /**
     * Point which becomes the new UCS origin after changing model space UCS to BACK when UCSBASE is set to WORLD
     */
    UCSORGBACK?: DwgPoint3D;
    /**
     * Point which becomes the new UCS origin after changing model space UCS to BOTTOM when UCSBASE is set to WORLD
     */
    UCSORGBOTTOM?: DwgPoint3D;
    /**
     * Point which becomes the new UCS origin after changing model space UCS to FRONT when UCSBASE is set to WORLD
     */
    UCSORGFRONT?: DwgPoint3D;
    /**
     * Point which becomes the new UCS origin after changing model space UCS to LEFT when UCSBASE is set to WORLD
     */
    UCSORGLEFT?: DwgPoint3D;
    /**
     * Point which becomes the new UCS origin after changing model space UCS to RIGHT when UCSBASE is set to WORLD
     */
    UCSORGRIGHT?: DwgPoint3D;
    /**
     * Point which becomes the new UCS origin after changing model space UCS to TOP when UCSBASE is set to WORLD
     */
    UCSORGTOP?: DwgPoint3D;
    /**
     * If model space UCS is orthographic (UCSORTHOVIEW not equal to 0), this is the name of the UCS that the orthographic UCS is relative to. If blank, UCS is relative to WORLD
     */
    UCSORTHOREF?: string;
    /**
     * Orthographic view type of model space UCS
     * - 0: UCS is not orthographic
     * - 1: Top
     * - 2: Bottom
     * - 3: Front
     * - 4: Back
     * - 5: Left
     * - 6: Right
     */
    UCSORTHOVIEW?: number;
    /**
     * Direction of the current UCS X axis (in WCS)
     */
    UCSXDIR?: number;
    /**
     * Direction of the current UCS Y axis (in WCS)
     */
    UCSYDIR?: number;
    /**
     * Low bit set = Display fractions, feet-and-inches, and surveyor's angles in input format
     */
    UNITMODE?: number;
    /**
     * Five integer variables intended for use by third-party developers
     */
    USERI1?: number;
    USERI2?: number;
    USERI3?: number;
    USERI4?: number;
    USERI5?: number;
    /**
     * Five real variables intended for use by third-party developers
     */
    USERR1?: number;
    USERR2?: number;
    USERR3?: number;
    USERR4?: number;
    USERR5?: number;
    /**
     * Controls the user timer for the drawing
     * - 0: Timer off
     * - 1: Timer on
     */
    USRTIMER?: number;
    /**
     * Uniquely identifies a particular version of a drawing. Updated when the drawing is modified
     */
    VERSIONGUID?: string;
    /**
     * Controls the properties of xref-dependent layers
     * - 0: Don't retain xref-dependent visibility settings
     * - 1: Retain xref-dependent visibility settings
     */
    VISRETAIN?: number;
    /**
     * Determines whether input for the DVIEW and VPOINT command evaluated as relative to the WCS or current UCS
     * - 0: Don't change UCS
     * - 1: Set UCS to WCS during DVIEW/VPOINT
     */
    WORLDVIEW?: number;
    /**
     * Controls the visibility of xref clipping boundaries
     * - 0: Clipping boundary is not visible
     * - 1: Clipping boundary is visible
     */
    XCLIPFRAME?: number;
    /**
     * Controls whether the current drawing can be edited in-place when being referenced by another drawing
     * - 0: Can't use in-place reference editing
     * - 1: Can use in-place reference editing
     */
    XEDIT?: number;
}

declare const HEADER_VARIABLES: readonly string[];

interface DwgCommonObject {
    ownerHandle: number;
    handle: number;
}

interface DwgImageDefObject extends DwgCommonObject {
    fileName: string;
    size: DwgPoint2D;
    sizeOfOnePixel: DwgPoint2D;
    isLoaded: number;
    resolutionUnits: number;
}

interface DwgLayoutObject extends DwgCommonObject {
    layoutName: string;
    controlFlag: number;
    tabOrder: number;
    minLimit: DwgPoint2D;
    maxLimit: DwgPoint2D;
    insertionPoint: DwgPoint3D;
    minExtent: DwgPoint3D;
    maxExtent: DwgPoint3D;
    elevation: number;
    ucsOrigin: DwgPoint3D;
    ucsXAxis: DwgPoint3D;
    ucsYAxis: DwgPoint3D;
    orthographicType: number;
    paperSpaceTableId: string;
    viewportId: string;
    namedUcsId?: string;
    orthographicUcsId?: string;
    shadePlotId: string;
}

interface DwgPlotSettingObject extends DwgCommonObject {
    pageSetupName: string;
    configName: string;
    paperSize: string;
    plotViewName: string;
    marginLeft: number;
    marginBottom: number;
    marginRight: number;
    marginTop: number;
    paperWidth: number;
    paperHeight: number;
    plotOriginX: number;
    plotOriginY: number;
    windowAreaXMin: number;
    windowAreaYMin: number;
    windowAreaXMax: number;
    windowAreaYMax: number;
    printScaleNominator: number;
    printScaleDenominator: number;
    layoutFlag: number;
    plotPaperUnit: number;
    plotRotation: 0 | 1 | 2 | 3;
    plotType: number;
    currentStyleSheet: string;
    standardScaleType: number;
    shadePlotMode: number;
    shadePlotResolution: number;
    shadePlotCustomDPI?: number;
    scaleFactor: number;
    imageOriginX: number;
    imageOriginY: number;
    shadePlotId: string;
}

interface DwgCommonTableEntry {
    name: string;
    handle: number;
    ownerHandle: number;
}
interface DwgTable<T extends DwgCommonTableEntry> {
    entries: T[];
}

interface DwgBlockRecordTableEntry extends DwgCommonTableEntry {
    /**
     * Block name
     */
    name: string;
    /**
     * Block-type flags (bit-coded values, may be combined):
     * - 0: Indicates none of the following flags apply
     * - 1: This is an anonymous block generated by hatching, associative dimensioning, other internal operations, or an application
     * - 2: This block has non-constant attribute definitions (this bit is not set if the block has any attribute definitions that are constant, or has no attribute definitions at all)
     * - 4: This block is an external reference (xref)
     * - 8: This block is an xref overlay
     * - 16: This block is externally dependent
     * - 32: This is a resolved external reference, or dependent of an external reference (ignored on input)
     * - 64: This definition is a referenced external reference (ignored on input)
     */
    flags: number;
    /**
     * Base point
     */
    basePoint: DwgPoint3D;
    /**
     * Block description (optional)
     */
    description?: string;
    /**
     * Hard-pointer ID/handle to associated LAYOUT object
     */
    layout: number;
    /**
     * Block insertion units.
     */
    insertionUnits: number;
    /**
     * Block explodability
     */
    explodability: number;
    /**
     * Block scalability
     */
    scalability: number;
    /**
     * Binary data for bitmap preview (optional)
     */
    bmpPreview?: string;
    /**
     * All of entities in this block record
     */
    entities: DwgEntity[];
}

interface DwgDimStyleTableEntry extends DwgCommonTableEntry {
    DIMPOST?: string;
    DIMAPOST?: string;
    DIMBLK: string;
    DIMBLK1: string;
    DIMBLK2: string;
    DIMSCALE: number;
    DIMASZ: number;
    DIMEXO: number;
    DIMDLI: number;
    DIMEXE: number;
    DIMRND: number;
    DIMDLE: number;
    DIMTP: number;
    DIMTM: number;
    DIMTXT: number;
    DIMCEN: number;
    DIMTSZ: number;
    DIMALTF: number;
    DIMLFAC: number;
    DIMTVP: number;
    DIMTFAC: number;
    DIMGAP: number;
    DIMALTRND: number;
    DIMTOL: number;
    DIMLIM: number;
    DIMTIH: number;
    DIMTOH: number;
    DIMSE1: 0 | 1;
    DIMSE2: 0 | 1;
    DIMTAD: number;
    DIMZIN: number;
    DIMAZIN: number;
    DIMALT: 0 | 1;
    DIMALTD: number;
    DIMTOFL: 0 | 1;
    DIMSAH: 0 | 1;
    DIMTIX: 0 | 1;
    DIMSOXD: 0 | 1;
    DIMCLRD: number;
    DIMCLRE: number;
    DIMCLRT: number;
    DIMADEC?: number;
    DIMUNIT?: number;
    DIMDEC: number;
    DIMTDEC: number;
    DIMALTU: number;
    DIMALTTD: number;
    DIMAUNIT: number;
    DIMFRAC: number;
    DIMLUNIT: number;
    DIMDSEP: string;
    DIMTMOVE: number;
    DIMJUST: number;
    DIMSD1: 0 | 1;
    DIMSD2: 0 | 1;
    DIMTOLJ: number;
    DIMTZIN: number;
    DIMALTZ: number;
    DIMALTTZ: number;
    DIMFIT?: number;
    DIMUPT: number;
    DIMATFIT: number;
    DIMTXSTY?: number;
    DIMLDRBLK?: number;
    DIMLWD: number;
    DIMLWE: number;
    DIMFXL: number;
    DIMJOGANG: number;
    DIMTFILL: number;
    DIMTFILLCLR: number;
    DIMARCSYM: number;
    DIMCLRD_N: number;
    DIMCLRE_N: number;
    DIMCLRT_N: number;
    DIMFXLON: number;
    DIMTXTDIRECTION: number;
    DIMALTMZF: number;
    DIMALTMZS: string;
    DIMMZF: number;
    DIMMZS: string;
}

interface DwgLayerTableEntry extends DwgCommonTableEntry {
    name: string;
    standardFlag: number;
    colorIndex: number;
    color: number;
    colorName?: string;
    transparency: number;
    lineType: string;
    frozen: boolean;
    off: boolean;
    frozenInNew: boolean;
    locked: boolean;
    plotFlag: number;
    lineweight: number;
    plotStyleNameObjectId?: string;
    materialObjectId?: string;
}

interface DwgLTypeTableEntry extends DwgCommonTableEntry {
    name: string;
    standardFlag: number;
    description: string;
    numberOfLineTypes: number;
    totalPatternLength: number;
    pattern?: DwgLineTypeElement[];
}
interface DwgLineTypeElement {
    elementLength: number;
    elementTypeFlag: number;
    shapeNumber?: number;
    styleObjectId?: string;
    scale?: number;
    rotation?: number;
    offsetX?: number;
    offsetY?: number;
    text?: string;
}

interface DwgStyleTableEntry extends DwgCommonTableEntry {
    standardFlag: number;
    fixedTextHeight: number;
    widthFactor: number;
    obliqueAngle: number;
    textGenerationFlag: number;
    lastHeight: number;
    font: string;
    bigFont: string;
    extendedFont?: string;
}

interface DwgVPortTableEntry extends DwgCommonTableEntry {
    name: string;
    standardFlag: number;
    lowerLeftCorner: DwgPoint2D;
    upperRightCorner: DwgPoint2D;
    center: DwgPoint2D;
    snapBasePoint: DwgPoint2D;
    snapSpacing: DwgPoint2D;
    gridSpacing: DwgPoint2D;
    viewDirectionFromTarget: DwgPoint3D;
    viewTarget: DwgPoint3D;
    lensLength: number;
    frontClippingPlane: number;
    backClippingPlane: number;
    viewHeight: number;
    snapRotationAngle: number;
    viewTwistAngle: number;
    circleSides: number;
    frozenLayers: string[];
    styleSheet: string;
    renderMode: number;
    viewMode: number;
    ucsIconSetting: number;
    ucsOrigin: DwgPoint3D;
    ucsXAxis: DwgPoint3D;
    ucsYAxis: DwgPoint3D;
    orthographicType: number;
    elevation: number;
    shadePlotSetting: number;
    majorGridLines: number;
    backgroundObjectId?: string;
    shadePlotObjectId?: string;
    visualStyleObjectId?: string;
    isDefaultLightingOn: boolean;
    defaultLightingType: number;
    brightness: number;
    contrast: number;
    ambientColor?: number;
}

interface DwgDatabase {
    tables: {
        BLOCK_RECORD: DwgTable<DwgBlockRecordTableEntry>;
        DIMSTYLE: DwgTable<DwgDimStyleTableEntry>;
        LAYER: DwgTable<DwgLayerTableEntry>;
        LTYPE: DwgTable<DwgLTypeTableEntry>;
        STYLE: DwgTable<DwgStyleTableEntry>;
        VPORT: DwgTable<DwgVPortTableEntry>;
    };
    objects: {
        IMAGEDEF: DwgImageDefObject[];
        LAYOUT: DwgLayoutObject[];
    };
    header: DwgHeader;
    /**
     * All of entities in the model space.
     */
    entities: DwgEntity[];
    classes: DwgClass[];
}

interface DwgVersion {
    type: string;
    hdr: string;
    description: string;
    version: number;
}
declare const dwgVersions: DwgVersion[];

// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
declare namespace RuntimeExports {
    namespace FS {
        export let root: any;
        export let mounts: any[];
        export let devices: {};
        export let streams: any[];
        export let nextInode: number;
        export let nameTable: any;
        export let currentPath: string;
        export let initialized: boolean;
        export let ignorePermissions: boolean;
        export { ErrnoError };
        export let filesystems: any;
        export let syncFSRequests: number;
        export let readFiles: {};
        export { FSStream };
        export { FSNode };
        export function lookupPath(path: any, opts?: {}): {
            path: string;
            node?: undefined;
        } | {
            path: string;
            node: any;
        };
        export function getPath(node: any): any;
        export function hashName(parentid: any, name: any): number;
        export function hashAddNode(node: any): void;
        export function hashRemoveNode(node: any): void;
        export function lookupNode(parent: any, name: any): any;
        export function createNode(parent: any, name: any, mode: any, rdev: any): any;
        export function destroyNode(node: any): void;
        export function isRoot(node: any): boolean;
        export function isMountpoint(node: any): boolean;
        export function isFile(mode: any): boolean;
        export function isDir(mode: any): boolean;
        export function isLink(mode: any): boolean;
        export function isChrdev(mode: any): boolean;
        export function isBlkdev(mode: any): boolean;
        export function isFIFO(mode: any): boolean;
        export function isSocket(mode: any): boolean;
        export function flagsToPermissionString(flag: any): string;
        export function nodePermissions(node: any, perms: any): 0 | 2;
        export function mayLookup(dir: any): any;
        export function mayCreate(dir: any, name: any): any;
        export function mayDelete(dir: any, name: any, isdir: any): any;
        export function mayOpen(node: any, flags: any): any;
        export function checkOpExists(op: any, err: any): any;
        export let MAX_OPEN_FDS: number;
        export function nextfd(): number;
        export function getStreamChecked(fd: any): any;
        export function getStream(fd: any): any;
        export function createStream(stream: any, fd?: number): any;
        export function closeStream(fd: any): void;
        export function dupStream(origStream: any, fd?: number): any;
        export function doSetAttr(stream: any, node: any, attr: any): void;
        export namespace chrdev_stream_ops {
            function open(stream: any): void;
            function llseek(): never;
        }
        export function major(dev: any): number;
        export function minor(dev: any): number;
        export function makedev(ma: any, mi: any): number;
        export function registerDevice(dev: any, ops: any): void;
        export function getDevice(dev: any): any;
        export function getMounts(mount: any): any[];
        export function syncfs(populate: any, callback: any): void;
        export function mount(type: any, opts: any, mountpoint: any): any;
        export function unmount(mountpoint: any): void;
        export function lookup(parent: any, name: any): any;
        export function mknod(path: any, mode: any, dev: any): any;
        export function statfs(path: any): any;
        export function statfsStream(stream: any): any;
        export function statfsNode(node: any): {
            bsize: number;
            frsize: number;
            blocks: number;
            bfree: number;
            bavail: number;
            files: any;
            ffree: number;
            fsid: number;
            flags: number;
            namelen: number;
        };
        export function create(path: any, mode?: number): any;
        export function mkdir(path: any, mode?: number): any;
        export function mkdirTree(path: any, mode: any): void;
        export function mkdev(path: any, mode: any, dev: any): any;
        export function symlink(oldpath: any, newpath: any): any;
        export function rename(old_path: any, new_path: any): void;
        export function rmdir(path: any): void;
        export function readdir(path: any): any;
        export function unlink(path: any): void;
        export function readlink(path: any): any;
        export function stat(path: any, dontFollow: any): any;
        export function fstat(fd: any): any;
        export function lstat(path: any): any;
        export function doChmod(stream: any, node: any, mode: any, dontFollow: any): void;
        export function chmod(path: any, mode: any, dontFollow: any): void;
        export function lchmod(path: any, mode: any): void;
        export function fchmod(fd: any, mode: any): void;
        export function doChown(stream: any, node: any, dontFollow: any): void;
        export function chown(path: any, uid: any, gid: any, dontFollow: any): void;
        export function lchown(path: any, uid: any, gid: any): void;
        export function fchown(fd: any, uid: any, gid: any): void;
        export function doTruncate(stream: any, node: any, len: any): void;
        export function truncate(path: any, len: any): void;
        export function ftruncate(fd: any, len: any): void;
        export function utime(path: any, atime: any, mtime: any): void;
        export function open(path: any, flags: any, mode?: number): any;
        export function close(stream: any): void;
        export function isClosed(stream: any): boolean;
        export function llseek(stream: any, offset: any, whence: any): any;
        export function read(stream: any, buffer: any, offset: any, length: any, position: any): any;
        export function write(stream: any, buffer: any, offset: any, length: any, position: any, canOwn: any): any;
        export function allocate(stream: any, offset: any, length: any): void;
        export function mmap(stream: any, length: any, position: any, prot: any, flags: any): any;
        export function msync(stream: any, buffer: any, offset: any, length: any, mmapFlags: any): any;
        export function ioctl(stream: any, cmd: any, arg: any): any;
        export function readFile(path: any, opts?: {}): any;
        export function writeFile(path: any, data: any, opts?: {}): void;
        export function cwd(): any;
        export function chdir(path: any): void;
        export function createDefaultDirectories(): void;
        export function createDefaultDevices(): void;
        export function createSpecialDirectories(): void;
        export function createStandardStreams(input: any, output: any, error: any): void;
        export function staticInit(): void;
        export function init(input: any, output: any, error: any): void;
        export function quit(): void;
        export function findObject(path: any, dontResolveLastLink: any): any;
        export function analyzePath(path: any, dontResolveLastLink: any): {
            isRoot: boolean;
            exists: boolean;
            error: number;
            name: any;
            path: any;
            object: any;
            parentExists: boolean;
            parentPath: any;
            parentObject: any;
        };
        export function createPath(parent: any, path: any, canRead: any, canWrite: any): any;
        export function createFile(parent: any, name: any, properties: any, canRead: any, canWrite: any): any;
        export function createDataFile(parent: any, name: any, data: any, canRead: any, canWrite: any, canOwn: any): void;
        export function createDevice(parent: any, name: any, input: any, output: any): any;
        export function forceLoadFile(obj: any): boolean;
        export function createLazyFile(parent: any, name: any, url: any, canRead: any, canWrite: any): any;
    }
    let ENV: {};
    /**
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {Arguments|Array=} args
     * @param {Object=} opts
     */
    function ccall(ident: any, returnType?: (string | null) | undefined, argTypes?: any[] | undefined, args?: (Arguments | any[]) | undefined, opts?: any | undefined): any;
    /**
     * @param {string=} returnType
     * @param {Array=} argTypes
     * @param {Object=} opts
     */
    function cwrap(ident: any, returnType?: string | undefined, argTypes?: any[] | undefined, opts?: any | undefined): any;
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
    function UTF8ToString(ptr: number, maxBytesToRead?: number | undefined): string;
    function stringToNewUTF8(str: any): any;
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
    function setValue(ptr: number, value: number, type?: string): void;
    let HEAPF32: any;
    let HEAPF64: any;
    let HEAP_DATA_VIEW: any;
    let HEAP8: any;
    let HEAPU8: any;
    let HEAP16: any;
    let HEAPU16: any;
    let HEAP32: any;
    let HEAPU32: any;
    let HEAP64: any;
    let HEAPU64: any;
}
declare class ErrnoError {
    constructor(errno: any);
    name: string;
    errno: any;
}
declare class FSStream {
    shared: {};
    set object(val: any);
    get object(): any;
    node: any;
    get isRead(): boolean;
    get isWrite(): boolean;
    get isAppend(): number;
    set flags(val: any);
    get flags(): any;
    set position(val: any);
    get position(): any;
}
declare class FSNode {
    constructor(parent: any, name: any, mode: any, rdev: any);
    node_ops: {};
    stream_ops: {};
    readMode: number;
    writeMode: number;
    mounted: any;
    parent: any;
    mount: any;
    id: number;
    name: any;
    mode: any;
    rdev: any;
    atime: number;
    mtime: number;
    ctime: number;
    set read(val: boolean);
    get read(): boolean;
    set write(val: boolean);
    get write(): boolean;
    get isFolder(): any;
    get isDevice(): any;
}
interface WasmModule {
}

type EmbindString = ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
interface ClassHandle {
  isAliasOf(other: ClassHandle): boolean;
  delete(): void;
  deleteLater(): this;
  isDeleted(): boolean;
  clone(): this;
}
interface Dwg_Version_TypeValue<T extends number> {
  value: T;
}
type Dwg_Version_Type = Dwg_Version_TypeValue<0>|Dwg_Version_TypeValue<1>|Dwg_Version_TypeValue<2>|Dwg_Version_TypeValue<3>|Dwg_Version_TypeValue<4>|Dwg_Version_TypeValue<5>|Dwg_Version_TypeValue<6>|Dwg_Version_TypeValue<7>|Dwg_Version_TypeValue<8>|Dwg_Version_TypeValue<9>|Dwg_Version_TypeValue<10>|Dwg_Version_TypeValue<11>|Dwg_Version_TypeValue<12>|Dwg_Version_TypeValue<13>|Dwg_Version_TypeValue<14>|Dwg_Version_TypeValue<15>|Dwg_Version_TypeValue<16>|Dwg_Version_TypeValue<17>|Dwg_Version_TypeValue<18>|Dwg_Version_TypeValue<18>|Dwg_Version_TypeValue<19>|Dwg_Version_TypeValue<20>|Dwg_Version_TypeValue<21>|Dwg_Version_TypeValue<22>|Dwg_Version_TypeValue<23>|Dwg_Version_TypeValue<24>|Dwg_Version_TypeValue<25>|Dwg_Version_TypeValue<26>|Dwg_Version_TypeValue<27>|Dwg_Version_TypeValue<28>|Dwg_Version_TypeValue<29>|Dwg_Version_TypeValue<30>|Dwg_Version_TypeValue<31>|Dwg_Version_TypeValue<32>|Dwg_Version_TypeValue<33>|Dwg_Version_TypeValue<34>|Dwg_Version_TypeValue<35>|Dwg_Version_TypeValue<36>|Dwg_Version_TypeValue<37>|Dwg_Version_TypeValue<38>|Dwg_Version_TypeValue<39>|Dwg_Version_TypeValue<40>|Dwg_Version_TypeValue<41>|Dwg_Version_TypeValue<42>;

interface Dwg_Class_StabilityValue<T extends number> {
  value: T;
}

interface Dwg_Entity_SectionsValue<T extends number> {
  value: T;
}

interface Dwg_Object_SupertypeValue<T extends number> {
  value: T;
}

interface Dwg_Object_TypeValue<T extends number> {
  value: T;
}
type Dwg_Object_Type = Dwg_Object_TypeValue<0>|Dwg_Object_TypeValue<1>|Dwg_Object_TypeValue<2>|Dwg_Object_TypeValue<3>|Dwg_Object_TypeValue<4>|Dwg_Object_TypeValue<5>|Dwg_Object_TypeValue<6>|Dwg_Object_TypeValue<7>|Dwg_Object_TypeValue<8>|Dwg_Object_TypeValue<10>|Dwg_Object_TypeValue<11>|Dwg_Object_TypeValue<12>|Dwg_Object_TypeValue<13>|Dwg_Object_TypeValue<14>|Dwg_Object_TypeValue<15>|Dwg_Object_TypeValue<16>|Dwg_Object_TypeValue<17>|Dwg_Object_TypeValue<18>|Dwg_Object_TypeValue<19>|Dwg_Object_TypeValue<20>|Dwg_Object_TypeValue<21>|Dwg_Object_TypeValue<22>|Dwg_Object_TypeValue<23>|Dwg_Object_TypeValue<24>|Dwg_Object_TypeValue<25>|Dwg_Object_TypeValue<26>|Dwg_Object_TypeValue<27>|Dwg_Object_TypeValue<28>|Dwg_Object_TypeValue<29>|Dwg_Object_TypeValue<30>|Dwg_Object_TypeValue<31>|Dwg_Object_TypeValue<32>|Dwg_Object_TypeValue<33>|Dwg_Object_TypeValue<34>|Dwg_Object_TypeValue<35>|Dwg_Object_TypeValue<36>|Dwg_Object_TypeValue<37>|Dwg_Object_TypeValue<38>|Dwg_Object_TypeValue<39>|Dwg_Object_TypeValue<40>|Dwg_Object_TypeValue<41>|Dwg_Object_TypeValue<42>|Dwg_Object_TypeValue<43>|Dwg_Object_TypeValue<44>|Dwg_Object_TypeValue<45>|Dwg_Object_TypeValue<46>|Dwg_Object_TypeValue<47>|Dwg_Object_TypeValue<48>|Dwg_Object_TypeValue<49>|Dwg_Object_TypeValue<50>|Dwg_Object_TypeValue<51>|Dwg_Object_TypeValue<52>|Dwg_Object_TypeValue<53>|Dwg_Object_TypeValue<56>|Dwg_Object_TypeValue<57>|Dwg_Object_TypeValue<60>|Dwg_Object_TypeValue<61>|Dwg_Object_TypeValue<62>|Dwg_Object_TypeValue<63>|Dwg_Object_TypeValue<64>|Dwg_Object_TypeValue<65>|Dwg_Object_TypeValue<66>|Dwg_Object_TypeValue<67>|Dwg_Object_TypeValue<68>|Dwg_Object_TypeValue<69>|Dwg_Object_TypeValue<72>|Dwg_Object_TypeValue<73>|Dwg_Object_TypeValue<74>|Dwg_Object_TypeValue<75>|Dwg_Object_TypeValue<76>|Dwg_Object_TypeValue<77>|Dwg_Object_TypeValue<78>|Dwg_Object_TypeValue<79>|Dwg_Object_TypeValue<80>|Dwg_Object_TypeValue<81>|Dwg_Object_TypeValue<82>|Dwg_Object_TypeValue<498>|Dwg_Object_TypeValue<499>;

interface Dwg_Object_Type_r11Value<T extends number> {
  value: T;
}

interface Dwg_ErrorValue<T extends number> {
  value: T;
}

interface Dwg_Hdl_CodeValue<T extends number> {
  value: T;
}

interface DWG_SECTION_TYPEValue<T extends number> {
  value: T;
}
type DWG_SECTION_TYPE = DWG_SECTION_TYPEValue<0>|DWG_SECTION_TYPEValue<1>|DWG_SECTION_TYPEValue<2>|DWG_SECTION_TYPEValue<3>|DWG_SECTION_TYPEValue<4>|DWG_SECTION_TYPEValue<0>|DWG_SECTION_TYPEValue<1>|DWG_SECTION_TYPEValue<2>|DWG_SECTION_TYPEValue<3>|DWG_SECTION_TYPEValue<4>|DWG_SECTION_TYPEValue<10>|DWG_SECTION_TYPEValue<11>|DWG_SECTION_TYPEValue<12>|DWG_SECTION_TYPEValue<13>|DWG_SECTION_TYPEValue<14>|DWG_SECTION_TYPEValue<15>|DWG_SECTION_TYPEValue<16>|DWG_SECTION_TYPEValue<17>|DWG_SECTION_TYPEValue<18>|DWG_SECTION_TYPEValue<19>;

interface RESBUF_VALUE_TYPEValue<T extends number> {
  value: T;
}
type RESBUF_VALUE_TYPE = RESBUF_VALUE_TYPEValue<0>|RESBUF_VALUE_TYPEValue<1>|RESBUF_VALUE_TYPEValue<2>|RESBUF_VALUE_TYPEValue<3>|RESBUF_VALUE_TYPEValue<0>|RESBUF_VALUE_TYPEValue<1>|RESBUF_VALUE_TYPEValue<2>|RESBUF_VALUE_TYPEValue<3>|RESBUF_VALUE_TYPEValue<0>|RESBUF_VALUE_TYPEValue<1>|RESBUF_VALUE_TYPEValue<2>|RESBUF_VALUE_TYPEValue<3>;

interface dwg_point_3d extends ClassHandle {
  x: number;
  y: number;
  z: number;
}

interface dwg_point_2d extends ClassHandle {
  x: number;
  y: number;
}

interface EmbindModule {
  Dwg_Version_Type: {R_INVALID: Dwg_Version_TypeValue<0>, R_1_1: Dwg_Version_TypeValue<1>, R_1_2: Dwg_Version_TypeValue<2>, R_1_3: Dwg_Version_TypeValue<3>, R_1_4: Dwg_Version_TypeValue<4>, R_2_0b: Dwg_Version_TypeValue<5>, R_2_0: Dwg_Version_TypeValue<6>, R_2_10: Dwg_Version_TypeValue<7>, R_2_21: Dwg_Version_TypeValue<8>, R_2_22: Dwg_Version_TypeValue<9>, R_2_4: Dwg_Version_TypeValue<10>, R_2_5: Dwg_Version_TypeValue<11>, R_2_6: Dwg_Version_TypeValue<12>, R_9: Dwg_Version_TypeValue<13>, R_9c1: Dwg_Version_TypeValue<14>, R_10: Dwg_Version_TypeValue<15>, R_11b1: Dwg_Version_TypeValue<16>, R_11b2: Dwg_Version_TypeValue<17>, R_11: Dwg_Version_TypeValue<18>, R_12: Dwg_Version_TypeValue<18>, R_13b1: Dwg_Version_TypeValue<19>, R_13b2: Dwg_Version_TypeValue<20>, R_13: Dwg_Version_TypeValue<21>, R_13c3: Dwg_Version_TypeValue<22>, R_14: Dwg_Version_TypeValue<23>, R_2000b: Dwg_Version_TypeValue<24>, R_2000: Dwg_Version_TypeValue<25>, R_2000i: Dwg_Version_TypeValue<26>, R_2002: Dwg_Version_TypeValue<27>, R_2004a: Dwg_Version_TypeValue<28>, R_2004b: Dwg_Version_TypeValue<29>, R_2004c: Dwg_Version_TypeValue<30>, R_2004: Dwg_Version_TypeValue<31>, R_2007a: Dwg_Version_TypeValue<32>, R_2007b: Dwg_Version_TypeValue<33>, R_2007: Dwg_Version_TypeValue<34>, R_2010b: Dwg_Version_TypeValue<35>, R_2010: Dwg_Version_TypeValue<36>, R_2013b: Dwg_Version_TypeValue<37>, R_2013: Dwg_Version_TypeValue<38>, R_2018b: Dwg_Version_TypeValue<39>, R_2018: Dwg_Version_TypeValue<40>, R_2022b: Dwg_Version_TypeValue<41>, R_AFTER: Dwg_Version_TypeValue<42>};
  Dwg_Class_Stability: {STABLE: Dwg_Class_StabilityValue<0>, UNSTABLE: Dwg_Class_StabilityValue<1>, DEBUGGING: Dwg_Class_StabilityValue<2>, UNHANDLED: Dwg_Class_StabilityValue<3>};
  Dwg_Entity_Sections: {ENTITY_SECTION: Dwg_Entity_SectionsValue<0>, BLOCKS_SECTION: Dwg_Entity_SectionsValue<64>, EXTRA_SECTION: Dwg_Entity_SectionsValue<128>};
  Dwg_Object_Supertype: {SUPERTYPE_ENTITY: Dwg_Object_SupertypeValue<0>, SUPERTYPE_OBJECT: Dwg_Object_SupertypeValue<1>};
  Dwg_Object_Type: {TYPE_UNUSED: Dwg_Object_TypeValue<0>, TYPE_TEXT: Dwg_Object_TypeValue<1>, TYPE_ATTRIB: Dwg_Object_TypeValue<2>, TYPE_ATTDEF: Dwg_Object_TypeValue<3>, TYPE_BLOCK: Dwg_Object_TypeValue<4>, TYPE_ENDBLK: Dwg_Object_TypeValue<5>, TYPE_SEQEND: Dwg_Object_TypeValue<6>, TYPE_INSERT: Dwg_Object_TypeValue<7>, TYPE_MINSERT: Dwg_Object_TypeValue<8>, TYPE_VERTEX_2D: Dwg_Object_TypeValue<10>, TYPE_VERTEX_3D: Dwg_Object_TypeValue<11>, TYPE_VERTEX_MESH: Dwg_Object_TypeValue<12>, TYPE_VERTEX_PFACE: Dwg_Object_TypeValue<13>, TYPE_VERTEX_PFACE_FACE: Dwg_Object_TypeValue<14>, TYPE_POLYLINE_2D: Dwg_Object_TypeValue<15>, TYPE_POLYLINE_3D: Dwg_Object_TypeValue<16>, TYPE_ARC: Dwg_Object_TypeValue<17>, TYPE_CIRCLE: Dwg_Object_TypeValue<18>, TYPE_LINE: Dwg_Object_TypeValue<19>, TYPE_DIMENSION_ORDINATE: Dwg_Object_TypeValue<20>, TYPE_DIMENSION_LINEAR: Dwg_Object_TypeValue<21>, TYPE_DIMENSION_ALIGNED: Dwg_Object_TypeValue<22>, TYPE_DIMENSION_ANG3PT: Dwg_Object_TypeValue<23>, TYPE_DIMENSION_ANG2LN: Dwg_Object_TypeValue<24>, TYPE_DIMENSION_RADIUS: Dwg_Object_TypeValue<25>, TYPE_DIMENSION_DIAMETER: Dwg_Object_TypeValue<26>, TYPE_POINT: Dwg_Object_TypeValue<27>, TYPE_3DFACE: Dwg_Object_TypeValue<28>, TYPE_POLYLINE_PFACE: Dwg_Object_TypeValue<29>, TYPE_POLYLINE_MESH: Dwg_Object_TypeValue<30>, TYPE_SOLID: Dwg_Object_TypeValue<31>, TYPE_TRACE: Dwg_Object_TypeValue<32>, TYPE_SHAPE: Dwg_Object_TypeValue<33>, TYPE_VIEWPORT: Dwg_Object_TypeValue<34>, TYPE_ELLIPSE: Dwg_Object_TypeValue<35>, TYPE_SPLINE: Dwg_Object_TypeValue<36>, TYPE_REGION: Dwg_Object_TypeValue<37>, TYPE_3DSOLID: Dwg_Object_TypeValue<38>, TYPE_BODY: Dwg_Object_TypeValue<39>, TYPE_RAY: Dwg_Object_TypeValue<40>, TYPE_XLINE: Dwg_Object_TypeValue<41>, TYPE_DICTIONARY: Dwg_Object_TypeValue<42>, TYPE_OLEFRAME: Dwg_Object_TypeValue<43>, TYPE_MTEXT: Dwg_Object_TypeValue<44>, TYPE_LEADER: Dwg_Object_TypeValue<45>, TYPE_TOLERANCE: Dwg_Object_TypeValue<46>, TYPE_MLINE: Dwg_Object_TypeValue<47>, TYPE_BLOCK_CONTROL: Dwg_Object_TypeValue<48>, TYPE_BLOCK_HEADER: Dwg_Object_TypeValue<49>, TYPE_LAYER_CONTROL: Dwg_Object_TypeValue<50>, TYPE_LAYER: Dwg_Object_TypeValue<51>, TYPE_STYLE_CONTROL: Dwg_Object_TypeValue<52>, TYPE_STYLE: Dwg_Object_TypeValue<53>, TYPE_LTYPE_CONTROL: Dwg_Object_TypeValue<56>, TYPE_LTYPE: Dwg_Object_TypeValue<57>, TYPE_VIEW_CONTROL: Dwg_Object_TypeValue<60>, TYPE_VIEW: Dwg_Object_TypeValue<61>, TYPE_UCS_CONTROL: Dwg_Object_TypeValue<62>, TYPE_UCS: Dwg_Object_TypeValue<63>, TYPE_VPORT_CONTROL: Dwg_Object_TypeValue<64>, TYPE_VPORT: Dwg_Object_TypeValue<65>, TYPE_APPID_CONTROL: Dwg_Object_TypeValue<66>, TYPE_APPID: Dwg_Object_TypeValue<67>, TYPE_DIMSTYLE_CONTROL: Dwg_Object_TypeValue<68>, TYPE_DIMSTYLE: Dwg_Object_TypeValue<69>, TYPE_GROUP: Dwg_Object_TypeValue<72>, TYPE_MLINESTYLE: Dwg_Object_TypeValue<73>, TYPE_OLE2FRAME: Dwg_Object_TypeValue<74>, TYPE_DUMMY: Dwg_Object_TypeValue<75>, TYPE_LONG_TRANSACTION: Dwg_Object_TypeValue<76>, TYPE_LWPOLYLINE: Dwg_Object_TypeValue<77>, TYPE_HATCH: Dwg_Object_TypeValue<78>, TYPE_XRECORD: Dwg_Object_TypeValue<79>, TYPE_PLACEHOLDER: Dwg_Object_TypeValue<80>, TYPE_VBA_PROJECT: Dwg_Object_TypeValue<81>, TYPE_LAYOUT: Dwg_Object_TypeValue<82>, TYPE_PROXY_ENTITY: Dwg_Object_TypeValue<498>, TYPE_PROXY_OBJECT: Dwg_Object_TypeValue<499>};
  Dwg_Object_Type_r11: {DWG_TYPE_UNUSED_r11: Dwg_Object_Type_r11Value<0>, DWG_TYPE_LINE_r11: Dwg_Object_Type_r11Value<1>, DWG_TYPE_POINT_r11: Dwg_Object_Type_r11Value<2>, DWG_TYPE_CIRCLE_r11: Dwg_Object_Type_r11Value<3>, DWG_TYPE_SHAPE_r11: Dwg_Object_Type_r11Value<4>, DWG_TYPE_REPEAT_r11: Dwg_Object_Type_r11Value<5>, DWG_TYPE_ENDREP_r11: Dwg_Object_Type_r11Value<6>, DWG_TYPE_TEXT_r11: Dwg_Object_Type_r11Value<7>, DWG_TYPE_ARC_r11: Dwg_Object_Type_r11Value<8>, DWG_TYPE_TRACE_r11: Dwg_Object_Type_r11Value<9>, DWG_TYPE_LOAD_r11: Dwg_Object_Type_r11Value<10>, DWG_TYPE_SOLID_r11: Dwg_Object_Type_r11Value<11>, DWG_TYPE_BLOCK_r11: Dwg_Object_Type_r11Value<12>, DWG_TYPE_ENDBLK_r11: Dwg_Object_Type_r11Value<13>, DWG_TYPE_INSERT_r11: Dwg_Object_Type_r11Value<14>, DWG_TYPE_ATTDEF_r11: Dwg_Object_Type_r11Value<15>, DWG_TYPE_ATTRIB_r11: Dwg_Object_Type_r11Value<16>, DWG_TYPE_SEQEND_r11: Dwg_Object_Type_r11Value<17>, DWG_TYPE_JUMP_r11: Dwg_Object_Type_r11Value<18>, DWG_TYPE_POLYLINE_r11: Dwg_Object_Type_r11Value<19>, DWG_TYPE_VERTEX_r11: Dwg_Object_Type_r11Value<20>, DWG_TYPE_3DLINE_r11: Dwg_Object_Type_r11Value<21>, DWG_TYPE_3DFACE_r11: Dwg_Object_Type_r11Value<22>, DWG_TYPE_DIMENSION_r11: Dwg_Object_Type_r11Value<23>, DWG_TYPE_VIEWPORT_r11: Dwg_Object_Type_r11Value<24>, DWG_TYPE_UNKNOWN_r11: Dwg_Object_Type_r11Value<25>};
  Dwg_Error: {DWG_NOERR: Dwg_ErrorValue<0>, DWG_ERR_WRONGCRC: Dwg_ErrorValue<1>, DWG_ERR_NOTYETSUPPORTED: Dwg_ErrorValue<2>, DWG_ERR_UNHANDLEDCLASS: Dwg_ErrorValue<4>, DWG_ERR_INVALIDTYPE: Dwg_ErrorValue<8>, DWG_ERR_INVALIDHANDLE: Dwg_ErrorValue<16>, DWG_ERR_INVALIDEED: Dwg_ErrorValue<32>, DWG_ERR_VALUEOUTOFBOUNDS: Dwg_ErrorValue<64>, DWG_ERR_CLASSESNOTFOUND: Dwg_ErrorValue<128>, DWG_ERR_SECTIONNOTFOUND: Dwg_ErrorValue<256>, DWG_ERR_PAGENOTFOUND: Dwg_ErrorValue<512>, DWG_ERR_INTERNALERROR: Dwg_ErrorValue<1024>, DWG_ERR_INVALIDDWG: Dwg_ErrorValue<2048>, DWG_ERR_IOERROR: Dwg_ErrorValue<4096>, DWG_ERR_OUTOFMEM: Dwg_ErrorValue<8192>};
  Dwg_Hdl_Code: {DWG_HDL_OWNER: Dwg_Hdl_CodeValue<0>, DWG_HDL_SOFTOWN: Dwg_Hdl_CodeValue<2>, DWG_HDL_HARDOWN: Dwg_Hdl_CodeValue<3>, DWG_HDL_SOFTPTR: Dwg_Hdl_CodeValue<4>, DWG_HDL_HARDPTR: Dwg_Hdl_CodeValue<5>};
  DWG_SECTION_TYPE: {SECTION_UNKNOWN: DWG_SECTION_TYPEValue<0>, SECTION_HEADER: DWG_SECTION_TYPEValue<1>, SECTION_AUXHEADER: DWG_SECTION_TYPEValue<2>, SECTION_CLASSES: DWG_SECTION_TYPEValue<3>, SECTION_HANDLES: DWG_SECTION_TYPEValue<4>, SECTION_TEMPLATE: DWG_SECTION_TYPEValue<0>, SECTION_OBJFREESPACE: DWG_SECTION_TYPEValue<1>, SECTION_OBJECTS: DWG_SECTION_TYPEValue<2>, SECTION_REVHISTORY: DWG_SECTION_TYPEValue<3>, SECTION_SUMMARYINFO: DWG_SECTION_TYPEValue<4>, SECTION_PREVIEW: DWG_SECTION_TYPEValue<10>, SECTION_APPINFO: DWG_SECTION_TYPEValue<11>, SECTION_APPINFOHISTORY: DWG_SECTION_TYPEValue<12>, SECTION_FILEDEPLIST: DWG_SECTION_TYPEValue<13>, SECTION_SECURITY: DWG_SECTION_TYPEValue<14>, SECTION_VBAPROJECT: DWG_SECTION_TYPEValue<15>, SECTION_SIGNATURE: DWG_SECTION_TYPEValue<16>, SECTION_ACDS: DWG_SECTION_TYPEValue<17>, SECTION_INFO: DWG_SECTION_TYPEValue<18>, SECTION_INFO: DWG_SECTION_TYPEValue<19>};
  RESBUF_VALUE_TYPE: {DWG_VT_INVALID: RESBUF_VALUE_TYPEValue<0>, DWG_VT_STRING: RESBUF_VALUE_TYPEValue<1>, DWG_VT_POINT3D: RESBUF_VALUE_TYPEValue<2>, DWG_VT_REAL: RESBUF_VALUE_TYPEValue<3>, DWG_VT_INT16: RESBUF_VALUE_TYPEValue<0>, DWG_VT_INT32: RESBUF_VALUE_TYPEValue<1>, DWG_VT_INT8: RESBUF_VALUE_TYPEValue<2>, DWG_VT_BINARY: RESBUF_VALUE_TYPEValue<3>, DWG_VT_HANDLE: RESBUF_VALUE_TYPEValue<0>, DWG_VT_OBJECTID: RESBUF_VALUE_TYPEValue<1>, DWG_VT_BOOL: RESBUF_VALUE_TYPEValue<2>, DWG_VT_INT64: RESBUF_VALUE_TYPEValue<3>};
  dwg_point_3d: {};
  dwg_point_2d: {};
  dwg_resbuf_value_type(_0: number): RESBUF_VALUE_TYPE;
  dwg_errstrings(_0: number): void;
  dwg_rgb_palette_index(_0: number): number;
  dwg_find_color_index(_0: number): number;
  dwg_object_get_tio(_0: number): number;
  dwg_object_get_type(_0: number): number;
  dwg_object_get_supertype(_0: number): number;
  dwg_object_get_fixedtype(_0: number): number;
  dwg_object_get_handle(_0: number): number;
  dwg_obj_obj_to_object(_0: number): number;
  dwg_obj_generic_to_object(_0: number): number;
  dwg_object_to_object(_0: number): number;
  dwg_object_to_object_tio(_0: number): number;
  dwg_object_to_entity(_0: number): number;
  dwg_object_to_entity_tio(_0: number): number;
  dwg_object_object_get_tio(_0: number): number;
  dwg_object_object_get_objid(_0: number): number;
  dwg_object_object_get_ownerhandle(_0: number): number;
  dwg_object_object_get_handle(_0: number): number;
  dwg_object_object_get_num_reactors(_0: number): number;
  dwg_object_object_get_reactors(_0: number): number;
  dwg_object_entity_get_ownerhandle(_0: number): number;
  dwg_object_entity_get_handle(_0: number): number;
  dwg_object_entity_get_line_weight(_0: number): number;
  dwg_object_entity_get_entmode(_0: number): number;
  dwg_object_entity_get_invisible(_0: number): number;
  dwg_object_entity_get_plotstyle_flags(_0: number): number;
  dwg_object_entity_get_material_flags(_0: number): number;
  dwg_object_entity_get_shadow_flags(_0: number): number;
  dwg_object_entity_has_full_visualstyle(_0: number): number;
  dwg_object_entity_has_face_visualstyle(_0: number): number;
  dwg_object_entity_has_edge_visualstyle(_0: number): number;
  dwg_object_entity_get_num_reactors(_0: number): number;
  dwg_object_entity_get_reactors(_0: number): number;
  dwg_ref_get_absref(_0: number): number;
  dwg_ref_get_object(_0: number): number;
  dwg_ref_get_handle(_0: number): number;
  dwg_ref_object(_0: number, _1: number): number;
  dwg_ref_object_relative(_0: number, _1: number, _2: number): number;
  dwg_ref_object_silent(_0: number, _1: number): number;
  dwg_resolve_handleref(_0: number, _1: number): number;
  dwg_get_version_type(_0: number): number;
  dwg_get_codepage(_0: number): number;
  dwg_get_num_classes(_0: number): number;
  dwg_block_control(_0: number): number;
  dwg_model_space_ref(_0: number): number;
  dwg_paper_space_ref(_0: number): number;
  dwg_model_space_object(_0: number): number;
  dwg_paper_space_object(_0: number): number;
  dwg_get_layer_count(_0: number): number;
  dwg_get_layer_index(_0: number, _1: number): number;
  dwg_get_num_objects(_0: number): number;
  dwg_get_object_num_objects(_0: number): number;
  dwg_class_is_entity(_0: number): number;
  dwg_obj_is_control(_0: number): number;
  dwg_obj_is_table(_0: number): number;
  dwg_obj_is_subentity(_0: number): number;
  dwg_obj_has_subentity(_0: number): number;
  dwg_obj_is_3dsolid(_0: number): number;
  dwg_obj_is_acsh(_0: number): number;
  dwg_get_num_entities(_0: number): number;
  dwg_get_entity_index(_0: number, _1: number): number;
  dwg_get_entity_layer(_0: number): number;
  dwg_next_object(_0: number): number;
  dwg_next_entity(_0: number): number;
  get_first_owned_entity(_0: number): number;
  get_next_owned_entity(_0: number, _1: number): number;
  get_first_owned_subentity(_0: number): number;
  get_next_owned_subentity(_0: number, _1: number): number;
  get_first_owned_block(_0: number): number;
  get_last_owned_block(_0: number): number;
  get_next_owned_block(_0: number, _1: number): number;
  get_next_owned_block_entity(_0: number, _1: number): number;
  dwg_get_first_object(_0: number, _1: Dwg_Object_Type): number;
  dwg_get_next_object(_0: number, _1: Dwg_Object_Type, _2: number): number;
  dwg_resolve_jump(_0: number): number;
  dwg_free(_0: number): void;
  dwg_free_object(_0: number): void;
  dwg_new_ref(_0: number): number;
  dwg_dup_handleref(_0: number, _1: number): number;
  dwg_supports_eed(_0: number): number;
  dwg_supports_obj(_0: number, _1: number): number;
  dwg_add_object(_0: number): number;
  dwg_get_object(_0: number, _1: number): number;
  dwg_absref_get_object(_0: number, _1: number): number;
  dwg_resolve_handle(_0: number, _1: bigint): number;
  dwg_resolve_handle_silent(_0: number, _1: bigint): number;
  dwg_next_handle(_0: number): bigint;
  dwg_next_handseed(_0: number): bigint;
  dwg_add_handle(_0: number, _1: number, _2: bigint, _3: number): number;
  dwg_add_handleref(_0: number, _1: number, _2: bigint, _3: number): number;
  dwg_add_handleref_free(_0: number, _1: bigint): number;
  dwg_obj_get_handle_value(_0: number): bigint;
  dwg_ref_get_handle_value(_0: number): bigint;
  dwg_ref_get_handle_absolute_ref(_0: number): bigint;
  dwg_object_entity_get_ltype_flags(_0: number): number;
  dwg_object_entity_get_ltype_scale(_0: number): number;
  dwg_model_x_min(_0: number): number;
  dwg_model_x_max(_0: number): number;
  dwg_model_y_min(_0: number): number;
  dwg_model_y_max(_0: number): number;
  dwg_model_z_min(_0: number): number;
  dwg_model_z_max(_0: number): number;
  dwg_page_x_min(_0: number): number;
  dwg_page_x_max(_0: number): number;
  dwg_page_y_min(_0: number): number;
  dwg_page_y_max(_0: number): number;
  dwg_object_get_dxfname(_0: number): string;
  is_dwg_entity(_0: EmbindString): boolean;
  is_dwg_object(_0: EmbindString): boolean;
  dwg_dynapi_header_set_value(_0: number, _1: EmbindString, _2: number, _3: boolean): boolean;
  dwg_dynapi_entity_set_value(_0: number, _1: EmbindString, _2: EmbindString, _3: number, _4: boolean): boolean;
  dwg_dynapi_common_set_value(_0: number, _1: EmbindString, _2: number, _3: boolean): boolean;
  dwg_dynapi_handle_name(_0: number, _1: number, _2: number): string;
  dwg_find_tablehandle(_0: number, _1: EmbindString, _2: EmbindString): number;
  dwg_find_tablehandle_index(_0: number, _1: number, _2: EmbindString): number;
  dwg_handle_name(_0: number, _1: EmbindString, _2: number): string;
  dwg_find_table_control(_0: number, _1: EmbindString): number;
  dwg_find_dictionary(_0: number, _1: EmbindString): number;
  dwg_find_dicthandle(_0: number, _1: number, _2: EmbindString): number;
  dwg_find_dicthandle_objname(_0: number, _1: number, _2: EmbindString): number;
  dwg_find_table_extname(_0: number, _1: number): string;
  dwg_variable_dict(_0: number, _1: EmbindString): string;
  dwg_section_type(_0: EmbindString): DWG_SECTION_TYPE;
  dwg_section_name(_0: number, _1: number): string;
  dwg_version_type(_0: Dwg_Version_Type): string;
  dwg_version_as(_0: EmbindString): Dwg_Version_Type;
  dwg_version_hdr_type(_0: EmbindString): Dwg_Version_Type;
  dwg_encrypt_SAT1(_0: number, _1: number, _2: number): string;
  dwg_object_name(_0: EmbindString, _1: number, _2: number, _3: number, _4: number): number;
  dwg_obj_layer_get_name(_0: number): string;
  dwg_obj_layer_set_name(_0: number, _1: EmbindString): number;
  dwg_obj_table_get_name(_0: number): string;
  dwg_ref_get_table_name(_0: number): string;
  dwg_ent_get_POINT2D(_0: number, _1: EmbindString): dwg_point_2d | null;
  dwg_ent_set_POINT2D(_0: number, _1: EmbindString, _2: dwg_point_2d | null): boolean;
  dwg_ent_get_POINT3D(_0: number, _1: EmbindString): dwg_point_3d | null;
  dwg_ent_set_POINT3D(_0: number, _1: EmbindString, _2: dwg_point_3d | null): boolean;
  dwg_ent_get_STRING(_0: number, _1: EmbindString): string;
  dwg_ent_set_STRING(_0: number, _1: EmbindString, _2: EmbindString): boolean;
  dwg_ent_get_UTF8(_0: number, _1: EmbindString): string;
  dwg_ent_set_UTF8(_0: number, _1: EmbindString, _2: EmbindString): boolean;
  dwg_ent_get_REAL(_0: number, _1: EmbindString): number;
  dwg_ent_set_REAL(_0: number, _1: EmbindString, _2: number): boolean;
  dwg_ent_get_INT16(_0: number, _1: EmbindString): number;
  dwg_ent_set_INT16(_0: number, _1: EmbindString, _2: number): boolean;
  dwg_ent_get_INT32(_0: number, _1: EmbindString): number;
  dwg_ent_set_INT32(_0: number, _1: EmbindString, _2: number): boolean;
  dwg_handle(_0: number): any;
  dwg_object_ref(_0: number): any;
  dwg_ptr_to_object_ref_array(_0: number, _1: number): any;
  dwg_ptr_to_object_ref_ptr_array(_0: number, _1: number): any;
  dwg_ptr_to_unsigned_char_array(_0: number, _1: number): any;
  dwg_ptr_to_signed_char_array(_0: number, _1: number): any;
  dwg_ptr_to_uint16_t_array(_0: number, _1: number): any;
  dwg_ptr_to_int16_t_array(_0: number, _1: number): any;
  dwg_ptr_to_uint32_t_array(_0: number, _1: number): any;
  dwg_ptr_to_int32_t_array(_0: number, _1: number): any;
  dwg_ptr_to_uint64_t_array(_0: number, _1: number): any;
  dwg_ptr_to_int64_t_array(_0: number, _1: number): any;
  dwg_ptr_to_double_array(_0: number, _1: number): any;
  dwg_ptr_to_point2d_array(_0: number, _1: number): any;
  dwg_ptr_to_point3d_array(_0: number, _1: number): any;
  dwg_ptr_to_point4d_array(_0: number, _1: number): any;
  dwg_ptr_to_ltype_dash_array(_0: number, _1: number): any;
  dwg_ptr_to_table_cell_array(_0: number, _1: number): any;
  dwg_ptr_to_hatch_defline_array(_0: number, _1: number): any;
  dwg_ptr_to_hatch_path_array(_0: number, _1: number): any;
  dwg_ptr_to_mline_vertex_array(_0: number, _1: number): any;
  dwg_object_get_name(_0: number): any;
  dwg_object_get_handle_object(_0: number): any;
  dwg_object_object_get_ownerhandle_object(_0: number): any;
  dwg_object_object_get_handle_object(_0: number): any;
  dwg_object_entity_get_ownerhandle_object(_0: number): any;
  dwg_object_entity_get_handle_object(_0: number): any;
  dwg_object_entity_get_layer_object_ref(_0: number): any;
  dwg_object_entity_get_ltype_object_ref(_0: number): any;
  dwg_object_entity_get_color_object(_0: number): any;
  dwg_ref_get_handle_object(_0: number): any;
  dwg_dynapi_header_value(_0: number, _1: EmbindString): any;
  dwg_dynapi_entity_value(_0: number, _1: EmbindString): any;
  dwg_dynapi_common_value(_0: number, _1: EmbindString): any;
  dwg_dynapi_subclass_value(_0: number, _1: EmbindString, _2: EmbindString): any;
  dwg_entity_polyline_2d_get_numpoints(_0: number): any;
  dwg_entity_polyline_2d_get_points(_0: number): any;
  dwg_entity_polyline_2d_get_vertices(_0: number): any;
  dwg_entity_polyline_3d_get_numpoints(_0: number): any;
  dwg_entity_polyline_3d_get_points(_0: number): any;
  dwg_entity_polyline_3d_get_vertices(_0: number): any;
  dwg_entity_block_header_get_preview(_0: number): any;
  dwg_read_file(_0: EmbindString): any;
  dwg_bmp(_0: number): any;
  dwg_get_class(_0: number, _1: number): any;
}

type MainModule = WasmModule & typeof RuntimeExports & EmbindModule;
declare function MainModuleFactory (options?: unknown): Promise<MainModule>;

type LibreDwgEx = LibreDwg & MainModule;
declare enum DwgThumbnailImageType {
    BMP = 2,
    WMF = 3,
    PNG = 6
}
interface DwgThumbnail {
    data: Uint8Array;
    type: DwgThumbnailImageType;
}
declare class LibreDwg {
    static instance: LibreDwgEx;
    private wasmInstance;
    private decoder?;
    private constructor();
    dwg_read_data(fileContent: string | ArrayBuffer, fileType: number): number | undefined;
    /**
     * Gets the version of the dwg.
     * @param data Pointer to Dwg_Data instance.
     * @returns Return the version of the dwg
     */
    dwg_get_version_type(data: Dwg_Data_Ptr): DwgVersion;
    /**
     * Gets code page of the dwg.
     * @param data Pointer to Dwg_Data instance.
     * @returns Return code page of the dwg
     */
    dwg_get_codepage(data: Dwg_Data_Ptr): DwgCodePage;
    /**
     * Extracts thumbnail image from dwg.
     * @param data Pointer to Dwg_Data instance.
     * @returns Return thumbnail image data
     */
    dwg_bmp(data: Dwg_Data_Ptr): DwgThumbnail | null;
    /**
     * Returns the number of classes in dwg file.
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns the number of classes in dwg file.
     */
    dwg_get_num_classes(data: Dwg_Data_Ptr): number;
    /**
     * Returns the nth class in dwg file.
     * @param data Pointer to Dwg_Data instance.
     * @param index Index of the class
     * @returns Returns the nth class in dwg file.
     */
    dwg_get_class(data: Dwg_Data_Ptr, index: number): Dwg_Class;
    /**
     * Converts Dwg_Data instance to DwgDatabase instance. DwgDatabase instance doesn't depend on
     * Dwg_Data instance any more after conversion. So you can call function dwg_free to free memory
     * occupied by Dwg_Data.
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns the converted DwgDatabase.
     */
    convert(data: Dwg_Data_Ptr): DwgDatabase;
    /**
     * Converts Dwg_Data instance to DwgDatabase instance and returns conversion statistics.
     * DwgDatabase instance doesn't depend on Dwg_Data instance any more after conversion.
     * So you can call function dwg_free to free memory occupied by Dwg_Data.
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns the converted DwgDatabase and conversion statistics.
     */
    convertEx(data: Dwg_Data_Ptr): {
        database: DwgDatabase;
        stats: {
            unknownEntityCount: number;
        };
    };
    /**
     * Converts DwgDatabase instance to svg string.
     * @param data DwgDatabase instance.
     * @returns Returns the converted svg string.
     */
    dwg_to_svg(data: DwgDatabase): string;
    /**
     * Frees the whole DWG. all tables, sections, objects, ...
     * @param data Pointer to Dwg_Data instance.
     */
    dwg_free(data: Dwg_Data_Ptr): void;
    /**
     * Frees the object (all three structs and its fields)
     * @group Dwg_Object Methods
     * @param ptr Pointer to one Dwg_Object instance.
     */
    dwg_free_object(obj_ptr: Dwg_Object_Ptr): void;
    /**
     * Gets an object by its handle.
     * @group Handle Conversion Methods
     * @param data Pointer to Dwg_Data instance.
     * @param ref_ptr Pointer to Dwg_Object_Ref instance.
     * @returns Returns the object whose handle is equal to the given handle.
     */
    dwg_ref_object(data: Dwg_Data_Ptr, ref_ptr: Dwg_Object_Ref_Ptr): Dwg_Object_Ptr;
    /**
     * Gets an object by its handle without warning message.
     * @group Handle Conversion Methods
     * @param data Pointer to Dwg_Data instance.
     * @param ref_ptr Pointer to Dwg_Object_Ref instance.
     * @returns Returns the object whose handle is equal to the given handle.
     */
    dwg_ref_object_silent(data: Dwg_Data_Ptr, ref_ptr: Dwg_Object_Ref_Ptr): Dwg_Object_Ptr;
    /**
     * Gets an object given its handle and relative base object.
     * @group Handle Conversion Methods
     * @param data Pointer to Dwg_Data instance.
     * @param ref_ptr Pointer to Dwg_Object_Ref instance.
     * @param obj_ptr Pointer to the relative base object (Dwg_Object instance).
     * @returns Returns the object given its handle and relative base object.
     */
    dwg_ref_object_relative(data: Dwg_Data_Ptr, ref_ptr: Dwg_Object_Ref_Ptr, obj_ptr: Dwg_Object_Ptr): Dwg_Object_Ptr;
    /**
     * Resolves handle absref value to Dwg_Object instance.
     * @group Handle Conversion Methods
     * @param data Pointer to Dwg_Data instance.
     * @param absref Handle absref value.
     * @returns Returns the object with the given handle absref value.
     */
    dwg_resolve_handle(data: Dwg_Data_Ptr, absref: bigint): Dwg_Object_Ptr;
    /**
     * Resolves handle absref value to Dwg_Object instance without warning message.
     * @group Handle Conversion Methods
     * @param data Pointer to Dwg_Data instance.
     * @param absref Handle absref value.
     * @returns Returns the object with the given handle absref value.
     */
    dwg_resolve_handle_silent(data: Dwg_Data_Ptr, absref: bigint): Dwg_Object_Ptr;
    /**
     * Sets ref->absolute_ref from the specified obj for a subsequent dwg_resolve_handle
     * @group Handle Conversion Methods
     * @param ref_ptr Pointer to Dwg_Object_Ref instance.
     * @param obj_ptr Pointer to Dwg_Object instance.
     * @returns Returns 1 if set absref value correctly. Otherwise, return 0.
     */
    dwg_resolve_handleref(ref_ptr: Dwg_Object_Ref_Ptr, obj_ptr: Dwg_Object_Ptr): number;
    /**
     * Returns object (such as line type, layer name, dimension style, and etc.) name by its handle.
     * @group Handle Conversion Methods
     * @param ref_ptr Pointer to Dwg_Object_Ref instance.
     * @returns Returns object name by its handle.
     */
    dwg_ref_get_object_name(ref_ptr: Dwg_Object_Ref_Ptr): string;
    /**
     * Converts Dwg_Object_Object instance to Dwg_Object instance.
     * @group Object Conversion Methods
     * @param obj_ptr Pointer to Dwg_Object_Object instance.
     * @returns Returns one pointer to Dwg_Object instance.
     */
    dwg_obj_obj_to_object(obj_obj_ptr: Dwg_Object_Object_Ptr): Dwg_Object_Ptr;
    /**
     * Converts Dwg_Object_* instance to Dwg_Object instance.
     * @group Object Conversion Methods
     * @param obj_generic_ptr Pointer to Dwg_Object_* instance.
     * @returns Returns one pointer to Dwg_Object instance.
     */
    dwg_obj_generic_to_object(obj_generic_ptr: Dwg_Object_Generic_Ptr): Dwg_Object_Ptr;
    /**
     * Converts Dwg_Object instance to Dwg_Object_Object instance.
     * @group Object Conversion Methods
     * @param obj_ptr Pointer to Dwg_Object instance.
     * @returns Returns one pointer to Dwg_Object_Object instance.
     */
    dwg_object_to_object(obj_ptr: Dwg_Object_Ptr): Dwg_Object_Object_Ptr;
    /**
     * Gets Dwg_Object_* instance (such as Dwg_Entity_LAYER, Dwg_Entity_STYLE, and etc.)
     * from Dwg_Object instance.
     * @group Object Conversion Methods
     * @param obj_ptr Pointer to Dwg_Object instance.
     * @returns Returns one pointer to Dwg_Object_Object_TIO_Ptr instance.
     */
    dwg_object_to_object_tio(obj_ptr: Dwg_Object_Ptr): Dwg_Object_Object_TIO_Ptr;
    /**
     * Converts Dwg_Object instance to Dwg_Object_Entity instance.
     * @group Object Conversion Methods
     * @param obj_ptr Pointer to Dwg_Object instance.
     * @returns Returns one pointer to Dwg_Object_Entity instance.
     */
    dwg_object_to_entity(obj_ptr: Dwg_Object_Ptr): Dwg_Object_Entity_Ptr;
    /**
     * Gets Dwg_Entity_* instance (such as Dwg_Entity_LINE, Dwg_Entity_SPLINE, and etc.)
     * from Dwg_Object instance.
     * @group Object Conversion Methods
     * @param obj_ptr Pointer to Dwg_Object instance.
     * @returns Returns one pointer to Dwg_Object_Object_TIO_Ptr instance.
     */
    dwg_object_to_entity_tio(obj_ptr: Dwg_Object_Ptr): Dwg_Object_Object_TIO_Ptr;
    /**
     * Returns all of entities in the model space. Each item in returned array
     * is one Dwg_Object pointer (Dwg_Object*).
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of entities in the model space.
     */
    dwg_getall_entities_in_model_space(data: Dwg_Data_Ptr): number[];
    /**
     * Returns all of objects in Dwg_Data instance with the specified type.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @param type Object type.
     * @returns Returns all of objects with the specified type.
     */
    dwg_getall_object_by_type(data: Dwg_Data_Ptr, type: Dwg_Object_Type$1): Dwg_Object_Object_TIO_Ptr[];
    /**
     * Returns all of objects in Dwg_Data instance with the specified type.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @param type Object type.
     * @returns Returns all of objects with the specified type.
     */
    dwg_getall_entity_by_type(data: Dwg_Data_Ptr, type: Dwg_Object_Type$1): Dwg_Object_Entity_TIO_Ptr[];
    /**
     * Returns all of layer objects in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of layer objects in Dwg_Data instance.
     */
    dwg_getall_LAYER(data: Dwg_Data_Ptr): Dwg_Object_LAYER_Ptr[];
    /**
     * Returns all of line type objects in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of line type objects in Dwg_Data instance.
     */
    dwg_getall_LTYPE(data: Dwg_Data_Ptr): Dwg_Object_LTYPE_Ptr[];
    /**
     * Returns all of text style objects in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of text style objects in Dwg_Data instance.
     */
    dwg_getall_STYLE(data: Dwg_Data_Ptr): Dwg_Object_STYLE_Ptr[];
    /**
     * Returns all of dimension style objects in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of dimension style objects in Dwg_Data instance.
     */
    dwg_getall_DIMSTYLE(data: Dwg_Data_Ptr): Dwg_Object_DIMSTYLE_Ptr[];
    /**
     * Returns all of viewport objects in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of viewport objects in Dwg_Data instance.
     */
    dwg_getall_VPORT(data: Dwg_Data_Ptr): Dwg_Object_VPORT_Ptr[];
    /**
     * Returns all of layout objects in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of layout objects in Dwg_Data instance.
     */
    dwg_getall_LAYOUT(data: Dwg_Data_Ptr): number[];
    /**
     * Returns all of block objects in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of block objects in Dwg_Data instance.
     */
    dwg_getall_BLOCK(data: Dwg_Data_Ptr): Dwg_Object_BLOCK_Ptr[];
    /**
     * Returns all of block header objects in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of block header objects in Dwg_Data instance.
     */
    dwg_getall_BLOCK_HEADER(data: Dwg_Data_Ptr): Dwg_Object_BLOCK_HEADER_Ptr[];
    /**
     * Returns all of image definition objects in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of image definition objects in Dwg_Data instance.
     */
    dwg_getall_IMAGEDEF(data: Dwg_Data_Ptr): Dwg_Object_IMAGEDEF_Ptr[];
    /**
     * Returns all of 2d vertex objects in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of 2d vertex objects in Dwg_Data instance.
     */
    dwg_getall_VERTEX_2D(data: Dwg_Data_Ptr): Dwg_Object_VERTEX_2D_Ptr[];
    /**
     * Returns all of 3d vertex objects in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of 3d vertex objects in Dwg_Data instance.
     */
    dwg_getall_VERTEX_3D(data: Dwg_Data_Ptr): Dwg_Object_VERTEX_3D_Ptr[];
    /**
     * Returns all of 2d polyline entities in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of 2d polyline entities in Dwg_Data instance.
     */
    dwg_getall_POLYLINE_2D(data: Dwg_Data_Ptr): Dwg_Entity_POLYLINE_2D_Ptr[];
    /**
     * Returns all of 3d polyline entities in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of 3d polyline entities in Dwg_Data instance.
     */
    dwg_getall_POLYLINE_3D(data: Dwg_Data_Ptr): Dwg_Entity_POLYLINE_3D_Ptr[];
    /**
     * Returns all of image entities in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of image entities in Dwg_Data instance.
     */
    dwg_getall_IMAGE(data: Dwg_Data_Ptr): Dwg_Entity_IMAGE_Ptr[];
    /**
     * Returns all of lwpolyline entities in Dwg_Data instance.
     * @group GetAll Methods
     * @param data Pointer to Dwg_Data instance.
     * @returns Returns all of lwpolyline entities in Dwg_Data instance.
     */
    dwg_getall_LWPOLYLINE(data: Dwg_Data_Ptr): Dwg_Entity_LWPOLYLINE_Ptr[];
    /**
     * Converts one C++ handle array to one JavaScript Dwg_Object_Ref array.
     * @group Array Methods
     * @param ptr Pointer to C++ handle array.
     * @param size The size of C++ handle array.
     * @returns Returns one JavaScript Dwg_Object_Ref array from the specified C++ handle array.
     */
    dwg_ptr_to_object_ref_array(ptr: Dwg_Array_Ptr, size: number): Dwg_Object_Ref[];
    /**
     * Converts one C++ handle array to one JavaScript Dwg_Object_Ref_Ptr array.
     * @group Array Methods
     * @param ptr Pointer to C++ handle array.
     * @param size The size of C++ handle array.
     * @returns Returns one JavaScript Dwg_Object_Ref_Ptr array from the specified C++ handle array.
     */
    dwg_ptr_to_object_ref_ptr_array(ptr: Dwg_Array_Ptr, size: number): Dwg_Object_Ref_Ptr[];
    /**
     * Converts one C++ unsigned char array to one JavaScript number array.
     * @group Array Methods
     * @param ptr Pointer to C++ unsigned char array.
     * @param size The size of C++ unsigned char array.
     * @returns Returns one JavaScript number array from the specified C++ unsigned char array.
     */
    dwg_ptr_to_unsigned_char_array(ptr: Dwg_Array_Ptr, size: number): number[];
    /**
     * Converts one C++ signed char array to one JavaScript number array.
     * @group Array Methods
     * @param ptr Pointer to C++ signed char array.
     * @param size The size of C++ signed char array.
     * @returns Returns one JavaScript number array from the specified C++ signed char array.
     */
    dwg_ptr_to_signed_char_array(ptr: Dwg_Array_Ptr, size: number): number[];
    /**
     * Converts one C++ unsigned int16 array to one JavaScript number array.
     * @group Array Methods
     * @param ptr Pointer to C++ unsigned int16 array.
     * @param size The size of C++ unsigned int16 array.
     * @returns Returns one JavaScript number array from the specified C++ unsigned int16 array.
     */
    dwg_ptr_to_uint16_t_array(ptr: Dwg_Array_Ptr, size: number): number[];
    /**
     * Converts one C++ int16 array to one JavaScript number array.
     * @group Array Methods
     * @param ptr Pointer to C++ int16 array.
     * @param size The size of C++ int16 array.
     * @returns Returns one JavaScript number array from the specified C++ int16 array.
     */
    dwg_ptr_to_int16_t_array(ptr: Dwg_Array_Ptr, size: number): number[];
    /**
     * Converts one C++ unsigned int32 array to one JavaScript number array.
     * @group Array Methods
     * @param ptr Pointer to C++ unsigned int32 array.
     * @param size The size of C++ unsigned int32 array.
     * @returns Returns one JavaScript number array from the specified C++ unsigned int32 array.
     */
    dwg_ptr_to_uint32_t_array(ptr: Dwg_Array_Ptr, size: number): number[];
    /**
     * Converts one C++ int32 array to one JavaScript number array.
     * @group Array Methods
     * @param ptr Pointer to C++ int32 array.
     * @param size The size of C++ int32 array.
     * @returns Returns one JavaScript number array from the specified C++ int32 array.
     */
    dwg_ptr_to_int32_t_array(ptr: Dwg_Array_Ptr, size: number): number[];
    /**
     * Converts one C++ unsigned int64 array to one JavaScript number array.
     * @group Array Methods
     * @param ptr Pointer to C++ unsigned int64 array.
     * @param size The size of C++ unsigned int64 array.
     * @returns Returns one JavaScript number array from the specified C++ unsigned int64 array.
     */
    dwg_ptr_to_uint64_t_array(ptr: Dwg_Array_Ptr, size: number): number[];
    /**
     * Converts one C++ int64 array to one JavaScript number array.
     * @group Array Methods
     * @param ptr Pointer to C++ int64 array.
     * @param size The size of C++ int64 array.
     * @returns Returns one JavaScript number array from the specified C++ int64 array.
     */
    dwg_ptr_to_int64_t_array(ptr: Dwg_Array_Ptr, size: number): number[];
    /**
     * Converts one C++ double array to one JavaScript number array.
     * @group Array Methods
     * @param ptr Pointer to C++ double array.
     * @param size The size of C++ double array.
     * @returns Returns one JavaScript number array from the specified C++ double array.
     */
    dwg_ptr_to_double_array(ptr: Dwg_Array_Ptr, size: number): number[];
    /**
     * Converts one C++ 2d point array to one JavaScript 2d point array.
     * @group Array Methods
     * @param ptr Pointer to C++ 2d point array.
     * @param size The size of C++ 2 point array.
     * @returns Returns one JavaScript 2d point array from the specified C++ 2d point array.
     */
    dwg_ptr_to_point2d_array(ptr: Dwg_Array_Ptr, size: number): DwgPoint2D[];
    /**
     * Converts one C++ 3d point array to one JavaScript 3d point array.
     * @group Array Methods
     * @param ptr Pointer to C++ 3d point array.
     * @param size The size of C++ 3d point array.
     * @returns Returns one JavaScript 3d point array from the specified C++ 3d point array.
     */
    dwg_ptr_to_point3d_array(ptr: Dwg_Array_Ptr, size: number): DwgPoint3D[];
    /**
     * Converts one C++ 4d point array to one JavaScript 4d point array.
     * @group Array Methods
     * @param ptr Pointer to C++ 4d point array.
     * @param size The size of C++ 4d point array.
     * @returns Returns one JavaScript 4d point array from the specified C++ 4d point array.
     */
    dwg_ptr_to_point4d_array(ptr: Dwg_Array_Ptr, size: number): DwgPoint4D[];
    /**
     * Converts one C++ line type array to one JavaScript line type array.
     * @group Array Methods
     * @param ptr Pointer to C++ line type array.
     * @param size The size of C++ line type array.
     * @returns Returns one JavaScript line type array from the specified C++ line type array.
     */
    dwg_ptr_to_ltype_dash_array(ptr: Dwg_Array_Ptr, size: number): Dwg_LTYPE_Dash[];
    /**
     * Converts one C++ table cell array to one JavaScript table cell array.
     * @group Array Methods
     * @group Dwg_Entity_TABLE Methods
     * @param ptr Pointer to C++ table cell array.
     * @param size The size of C++ table cell array.
     * @returns Returns one JavaScript table cell array from the specified C++ table cell array.
     */
    dwg_ptr_to_table_cell_array(ptr: Dwg_Array_Ptr, size: number): Dwg_TABLE_Cell[];
    /**
     * Converts one C++ hatch definition line array to one JavaScript hatch definition line array.
     * @group Array Methods
     * @group Dwg_Entity_HATCH Methods
     * @param ptr Pointer to C++ hatch definition line array.
     * @param size The size of C++ hatch definition line array.
     * @returns Returns one JavaScript hatch definition line array from the specified C++ hatch definition line array.
     */
    dwg_ptr_to_hatch_defline_array(ptr: Dwg_Array_Ptr, size: number): Dwg_HATCH_DefLine[];
    /**
     * Converts one C++ hatch path array to one JavaScript hatch path array.
     * @group Array Methods
     * @group Dwg_Entity_HATCH Methods
     * @param ptr Pointer to C++ hatch path array.
     * @param size The size of C++ hatch path array.
     * @returns Returns one JavaScript hatch path array from the specified C++ hatch path array.
     */
    dwg_ptr_to_hatch_path_array(ptr: Dwg_Array_Ptr, size: number): Dwg_HATCH_Path[];
    /**
     * Converts one C++ mline vertex array to one JavaScript mline vertex array.
     * @group Array Methods
     * @group Dwg_Entity_MLINE Methods
     * @param ptr Pointer to C++ mline vertex array.
     * @param size The size of C++ mline vertex array.
     * @returns Returns one JavaScript mline vertex array from the specified C++ mline vertex array.
     */
    dwg_ptr_to_mline_vertex_array(ptr: Dwg_Array_Ptr, size: number): Dwg_MLINE_Vertex[];
    /**
     * Generic field value getter. Used to get the field value of one object or entity.
     * @group Dynamic API Methods
     * @param obj Pointer to one object or entity
     * @param field Field name of one object or entity
     * @returns Returns the field value of one object or entity.
     */
    dwg_dynapi_entity_value(obj: Dwg_Object_Object_TIO_Ptr | Dwg_Object_Entity_TIO_Ptr, field: string): Dwg_Field_Value;
    /**
     * Header field value getter. Used to get the field value of dwg/dxf header.
     * @group Dynamic API Methods
     * @param data Pointer to Dwg_Data instance.
     * @param field Field name of header.
     * @returns Returns the field value of dwg/dxf header.
     */
    dwg_dynapi_header_value(data: Dwg_Data_Ptr, field: string): Dwg_Field_Value;
    /**
     * The common field value getter. Used to get the value of object or entity common fields.
     * @group Dynamic API Methods
     * @param obj Pointer to one object or entity
     * @param field The name of object or entity common fields.
     * @returns Returns the value of object or entity common fields.
     */
    dwg_dynapi_common_value(obj: Dwg_Object_Object_TIO_Ptr | Dwg_Object_Entity_TIO_Ptr, field: string): Dwg_Field_Value;
    /**
     * The field of one object or entity may not be primitive type. It means one field may consist of
     * multiple sub-fields. This method is used to get the sub-field value of those complex field.
     * @group Dynamic API Methods
     * @param obj Pointer to one object or entity.
     * @param subclass The class name of the field with complex type.
     * @param field The field name of one object or entit.
     * @returns Returns the sub-field value of one complex field.
     */
    dwg_dynapi_subclass_value(obj: Dwg_Object_Object_TIO_Ptr | Dwg_Object_Entity_TIO_Ptr, subclass: string, field: string): Dwg_Field_Value;
    /**
     * Returns the handle of one Dwg_Object instance.
     * @group Dwg_Object Methods
     * @param ptr Pointer to one Dwg_Object instance.
     * @returns Returns the handle of one Dwg_Object instance.
     */
    dwg_object_get_handle_object(ptr: Dwg_Object_Ptr): Dwg_Handle;
    /**
     * Returns the handle of one Dwg_Object_Object instance.
     * @group Dwg_Object_Object Methods
     * @param ptr Pointer to one Dwg_Object_Object instance.
     * @returns Returns the handle of one Dwg_Object_Object instance.
     */
    dwg_object_object_get_handle_object(ptr: Dwg_Object_Object_Ptr): Dwg_Handle;
    /**
     * Returns the owner handle of one Dwg_Object_Object instance.
     * @group Dwg_Object_Object Methods
     * @param ptr Pointer to one Dwg_Object_Object instance.
     * @returns Returns the owner handle of one Dwg_Object_Object instance.
     */
    dwg_object_object_get_ownerhandle_object(ptr: Dwg_Object_Object_Ptr): Dwg_Object_Ref;
    /**
     * Returns the handle of one Dwg_Object_Entity instance.
     * @group Dwg_Object_Entity Methods
     * @param ptr Pointer to one Dwg_Object_Entity instance.
     * @returns Returns the handle of one Dwg_Object_Entity instance.
     */
    dwg_object_entity_get_handle_object(ptr: Dwg_Object_Entity_Ptr): Dwg_Handle;
    /**
     * Returns the owner handle of one Dwg_Object_Entity instance.
     * @group Dwg_Object_Entity Methods
     * @param ptr Pointer to one Dwg_Object_Entity instance.
     * @returns Returns the owner handle of one Dwg_Object_Entity instance.
     */
    dwg_object_entity_get_ownerhandle_object(ptr: Dwg_Object_Entity_Ptr): Dwg_Object_Ref;
    /**
     * Returns the layer handle of one Dwg_Object_Entity instance.
     * @group Dwg_Object_Entity Methods
     * @param ptr Pointer to one Dwg_Object_Entity instance.
     * @returns Returns the layer handle of one Dwg_Object_Entity instance.
     */
    dwg_object_entity_get_layer_object_ref(ptr: Dwg_Object_Entity_Ptr): Dwg_Object_Ref;
    /**
     * Returns the line type handle of one Dwg_Object_Entity instance.
     * @group Dwg_Object_Entity Methods
     * @param ptr Pointer to one Dwg_Object_Entity instance.
     * @returns Returns the line type handle of one Dwg_Object_Entity instance.
     */
    dwg_object_entity_get_ltype_object_ref(ptr: Dwg_Object_Entity_Ptr): Dwg_Object_Ref;
    /**
     * Returns color value of one Dwg_Object_Entity instance.
     * @group Dwg_Object_Entity Methods
     * @param ptr Pointer to one Dwg_Object_Entity instance.
     * @returns Returns color value of one Dwg_Object_Entity instance.
     */
    dwg_object_entity_get_color_object(ptr: Dwg_Object_Entity_Ptr): Dwg_Color;
    /**
     * Returns block name of one Dwg_Entity_* instance with one block field. For example,
     * dimension entities have one 'block' field which represents the block that contains
     * the entities that make up the dimension picture.
     * @group Dwg_Entity_* Methods
     * @param ptr Pointer to one Dwg_Entity_* instance  with one block field.
     * @param field Field name of the block.
     * @returns Returns block name of one Dwg_Entity_* instance.
     */
    dwg_entity_get_block_name(ptr: Dwg_Object_Entity_TIO_Ptr, field: string): string;
    /**
     * Returns dimension style name of one Dwg_Entity_* instance with one dimension style
     * field.
     * @group Dwg_Entity_* Methods
     * @param ptr Pointer to one Dwg_Entity_* instance.
     * @param field Field name of the dimension style.
     * @returns Returns dimension style name of one Dwg_Entity_* instance.
     */
    dwg_entity_get_dimstyle_name(ptr: Dwg_Object_Entity_TIO_Ptr, field?: string): string;
    /**
     * Returns block entity pointed by the specified block header.
     * @group Dwg_Entity_BLOCK_HEADER Methods
     * @param ptr Pointer to one Dwg_Entity_BLOCK_HEADER instance.
     * @returns Returns block entity pointed by the specified block header.
     */
    dwg_entity_block_header_get_block(ptr: Dwg_Object_BLOCK_HEADER_Ptr): Dwg_Entity_BLOCK;
    /**
     * Returns preview image of the block pointed by the specified block header.
     * @group Dwg_Entity_BLOCK_HEADER Methods
     * @param ptr Pointer to one Dwg_Entity_BLOCK_HEADER instance.
     * @returns Returns preview image of the block pointed by the specified block header.
     */
    dwg_entity_block_header_get_preview(ptr: Dwg_Object_BLOCK_HEADER_Ptr): Uint8Array;
    /**
     * Returns the first entity owned by the block header or null
     * @group Dwg_Entity_BLOCK_HEADER Methods
     * @param ptr Pointer to the block header.
     * @returns Returns the first entity owned by the block header or null
     */
    get_first_owned_entity(ptr: Dwg_Object_Ptr): Dwg_Object_Ptr;
    /**
     * Returns the next entity owned by the block header or null.
     * @group Dwg_Entity_BLOCK_HEADER Methods
     * @param ptr Pointer to the block header.
     * @param current Pointer to the current entity in the block header.
     * @returns Returns the next entity owned by the block header or null.
     */
    get_next_owned_entity(ptr: Dwg_Object_Ptr, current: Dwg_Object_Ptr): Dwg_Object_Ptr;
    /**
     * Returns text style name of one Dwg_Entity_MTEXT instance.
     * @group Dwg_Entity_MTEXT Methods
     * @param ptr Pointer to one Dwg_Entity_MTEXT instance.
     * @returns Returns text style name of one Dwg_Entity_MTEXT instance.
     */
    dwg_entity_mtext_get_style_name(ptr: Dwg_Entity_MTEXT_Ptr): string;
    /**
     * Returns text style name of one Dwg_Entity_TEXT instance.
     * @group Dwg_Entity_TEXT Methods
     * @param ptr Pointer to one Dwg_Entity_TEXT instance.
     * @returns Returns text style name of one Dwg_Entity_TEXT instance.
     */
    dwg_entity_text_get_style_name(ptr: Dwg_Entity_TEXT_Ptr): string;
    /**
     * Returns the number of points in Dwg_Entity_POLYLINE_2D.
     * @group Dwg_Entity_POLYLINE_2D Methods
     * @param ptr Pointer to one Dwg_Object (not Dwg_Entity_POLYLINE_2D) instance.
     * @returns Returns the number of points in one Dwg_Entity_POLYLINE_2D.
     */
    dwg_entity_polyline_2d_get_numpoints(ptr: Dwg_Object_Ptr): number;
    /**
     * Returns points in Dwg_Entity_POLYLINE_2D.
     * @group Dwg_Entity_POLYLINE_2D Methods
     * @param ptr Pointer to one Dwg_Object (not Dwg_Entity_POLYLINE_2D) instance.
     * @returns Returns points in one Dwg_Entity_POLYLINE_2D.
     */
    dwg_entity_polyline_2d_get_points(ptr: Dwg_Object_Ptr): DwgPoint2D[];
    /**
     * Returns vertices in Dwg_Entity_POLYLINE_2D.
     * @group Dwg_Entity_POLYLINE_2D Methods
     * @param ptr Pointer to one Dwg_Object (not Dwg_Entity_POLYLINE_2D) instance.
     * @returns Returns vertices in one Dwg_Entity_POLYLINE_2D.
     */
    dwg_entity_polyline_2d_get_vertices(ptr: Dwg_Object_Ptr): Dwg_Entity_VERTEX_2D[];
    /**
     * Returns the number of points in Dwg_Entity_POLYLINE_3D.
     * @group Dwg_Entity_POLYLINE_3D Methods
     * @param ptr Pointer to one Dwg_Object (not Dwg_Entity_POLYLINE_3D) instance.
     * @returns Returns the number of points in one Dwg_Entity_POLYLINE_3D.
     */
    dwg_entity_polyline_3d_get_numpoints(ptr: Dwg_Object_Ptr): number;
    /**
     * Returns points in Dwg_Entity_POLYLINE_3D.
     * @group Dwg_Entity_POLYLINE_3D Methods
     * @param ptr Pointer to one Dwg_Object (not Dwg_Entity_POLYLINE_3D) instance.
     * @returns Returns points in one Dwg_Entity_POLYLINE_3D.
     */
    dwg_entity_polyline_3d_get_points(ptr: Dwg_Object_Ptr): DwgPoint3D[];
    /**
     * Returns vertices in Dwg_Entity_POLYLINE_3D.
     * @group Dwg_Entity_POLYLINE_3D Methods
     * @param ptr Pointer to one Dwg_Object (not Dwg_Entity_POLYLINE_3D) instance.
     * @returns Returns vertices in one Dwg_Entity_POLYLINE_3D.
     */
    dwg_entity_polyline_3d_get_vertices(ptr: Dwg_Object_Ptr): Dwg_Entity_VERTEX_3D[];
    static createByWasmInstance(wasmInstance: MainModule): LibreDwgEx;
    static create(filepath?: string): Promise<LibreDwgEx>;
}

export { type Dwg3dFaceEntity, type DwgAlignedDimensionEntity, type DwgAngularDimensionEntity, type DwgArcEdge, type DwgArcEntity, DwgAttachmentPoint, type DwgAttdefEntity, type DwgAttribEntity, type DwgBlockRecordTableEntry, type DwgBoundaryPath, type DwgBoundaryPathEdge, DwgBoundaryPathEdgeType, DwgBoundaryPathTypeFlag, type DwgCircleEntity, type DwgClass, DwgCodePage, type DwgCommonObject, type DwgCommonTableEntry, type DwgDatabase, DwgDefaultLightingType, type DwgDimStyleTableEntry, type DwgDimensionEntity, type DwgDimensionEntityCommon, DwgDimensionTextHorizontal, DwgDimensionTextLineSpacing, DwgDimensionTextVertical, DwgDimensionToleranceTextVertical, DwgDimensionType, DwgDimensionZeroSuppression, DwgDimensionZeroSuppressionAngular, type DwgEdgeBoundaryPath, type DwgEllipseEdge, type DwgEllipseEntity, type DwgEmbeddedMText, type DwgEntity, type DwgGradientHatchEntity, DwgHatchAssociativity, DwgHatchBoundaryAnnotation, type DwgHatchDefinitionLine, type DwgHatchEntity, type DwgHatchEntityBase, DwgHatchGradientColorFlag, DwgHatchGradientFlag, DwgHatchPatternType, DwgHatchSolidFill, DwgHatchStyle, type DwgHeader, DwgImageClipMode, DwgImageClippingBoundaryType, type DwgImageDefObject, type DwgImageEntity, DwgImageFlags, type DwgInsertEntity, type DwgLTypeTableEntry, type DwgLWPolylineEntity, type DwgLWPolylineVertex, type DwgLayerTableEntry, type DwgLayoutObject, DwgLeaderCreationFlag, type DwgLeaderEntity, type DwgLineEdge, type DwgLineEntity, type DwgLineTypeElement, type DwgMLineEntity, type DwgMLineLine, type DwgMLineVertex, DwgMTextDrawingDirection, type DwgMTextEntity, type DwgOle2FrameEntity, type DwgOleFrameEntity, type DwgOrdinateDimensionEntity, DwgOrthographicType, type DwgPlotSettingObject, type DwgPoint2D, type DwgPoint2DWithWeight, type DwgPoint3D, type DwgPoint4D, type DwgPointEntity, type DwgPolyline2dEntity, type DwgPolyline3dEntity, type DwgPolylineBoundaryPath, DwgPolylineFlag, type DwgProxyEntity, type DwgRadialDiameterDimensionEntity, type DwgRayEntity, DwgRenderMode, type DwgSectionEntity, DwgShadePlotMode, DwgSmoothType, type DwgSolidEntity, type DwgSplineEdge, type DwgSplineEntity, type DwgStyleTableEntry, type DwgTable, type DwgTableCell, type DwgTableEntity, type DwgTextBase, type DwgTextEntity, DwgTextGenerationFlag, DwgTextHorizontalAlign, DwgTextVerticalAlign, type DwgThumbnail, DwgThumbnailImageType, type DwgToleranceEntity, DwgUCSPerViewport, type DwgVPortTableEntry, type DwgVersion, type DwgVertex2dEntity, type DwgVertex3dEntity, DwgVertexFlag, type DwgViewportEntity, DwgViewportStatusFlag, type DwgWipeoutEntity, type DwgXData, type DwgXDataEntry, type DwgXlineEntity, type Dwg_Array_Ptr, type Dwg_Class, type Dwg_Color, type Dwg_ContentFormat, type Dwg_Data_Ptr, type Dwg_Entity_BLOCK, type Dwg_Entity_IMAGE_Ptr, type Dwg_Entity_LWPOLYLINE_Ptr, type Dwg_Entity_MTEXT_Ptr, type Dwg_Entity_POLYLINE_2D_Ptr, type Dwg_Entity_POLYLINE_3D_Ptr, type Dwg_Entity_TEXT_Ptr, type Dwg_Entity_VERTEX_2D, type Dwg_Entity_VERTEX_3D, type Dwg_Field_Value, type Dwg_Field_Value_Data_Type, Dwg_File_Type, type Dwg_HATCH_DefLine, type Dwg_HATCH_Path, type Dwg_HATCH_PathSeg, type Dwg_HATCH_PolylinePath, type Dwg_Handle, Dwg_Hatch_Edge_Type, type Dwg_LTYPE_Dash, type Dwg_LinkedData, type Dwg_MLINE_Line, type Dwg_MLINE_Vertex, type Dwg_Object_BLOCK_HEADER_Ptr, type Dwg_Object_BLOCK_Ptr, type Dwg_Object_DIMSTYLE_Ptr, type Dwg_Object_Entity_Ptr, type Dwg_Object_Entity_TIO_Ptr, type Dwg_Object_Generic_Ptr, type Dwg_Object_IMAGEDEF_Ptr, type Dwg_Object_LAYER_Ptr, type Dwg_Object_LTYPE_Ptr, type Dwg_Object_Object_Ptr, type Dwg_Object_Object_TIO_Ptr, type Dwg_Object_Ptr, type Dwg_Object_Ref, type Dwg_Object_Ref_Ptr, type Dwg_Object_STYLE_Ptr, Dwg_Object_Supertype, Dwg_Object_Type$1 as Dwg_Object_Type, Dwg_Object_Type_Inverted, type Dwg_Object_VERTEX_2D_Ptr, type Dwg_Object_VERTEX_3D_Ptr, type Dwg_Object_VPORT_Ptr, type Dwg_String, type Dwg_TABLE_AttrDef, type Dwg_TABLE_Cell, type Dwg_TableCell, type Dwg_TableCellContent, type Dwg_TableCellContent_Attr, HEADER_VARIABLES, LibreDwg, type LibreDwgEx, MainModuleFactory as createModule, dwgCodePageToEncoding, dwgVersions, isModelSpace, isPaperSpace };
