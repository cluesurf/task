import EXIFTOOL_TAG from './exiftool.tag.json' assert { type: 'json' }
import { Hash } from '@termsurf/form'

export const exiftool_image_format_content: Hash = {
  form: 'hash',
  file: 'exiftool',
  bond: {
    head: { like: 'string' },
    read: { like: 'boolean', need: false, fall: false },
    write: { like: 'boolean', need: false, fall: false },
    create: { like: 'boolean', need: false, fall: false },
  },
  hash: {
    '360': { head: '360', read: true, write: true },
    '3_fr': { head: '3FR', read: true },
    '3_g2': { head: '3G2', read: true, write: true },
    '3_gp': { head: '3GP', read: true, write: true },
    '7_z': { head: '7Z', read: true },
    a: { head: 'A', read: true },
    aa: { head: 'AA', read: true },
    aac: { head: 'AAC', read: true },
    aae: { head: 'AAE', read: true },
    aax: { head: 'AAX', read: true, write: true },
    acr: { head: 'ACR', read: true },
    afm: { head: 'AFM', read: true },
    ai: { head: 'AI', read: true, write: true },
    aiff: { head: 'AIFF', read: true },
    ape: { head: 'APE', read: true },
    arq: { head: 'ARQ', read: true, write: true },
    arw: { head: 'ARW', read: true, write: true },
    asf: { head: 'ASF', read: true },
    avi: { head: 'AVI', read: true },
    avif: { head: 'AVIF', read: true, write: true },
    azw: { head: 'AZW', read: true },
    bmp: { head: 'BMP', read: true },
    bpg: { head: 'BPG', read: true },
    btf: { head: 'BTF', read: true },
    chm: { head: 'CHM', read: true },
    cos: { head: 'COS', read: true },
    cr2: { head: 'CR2', read: true, write: true },
    cr3: { head: 'CR3', read: true, write: true },
    crm: { head: 'CRM', read: true, write: true },
    crw: { head: 'CRW', read: true, write: true },
    cs1: { head: 'CS1', read: true, write: true },
    csv: { head: 'CSV', read: true },
    cur: { head: 'CUR', read: true },
    czi: { head: 'CZI', read: true },
    dcm: { head: 'DCM', read: true },
    dcp: { head: 'DCP', read: true, write: true },
    dcr: { head: 'DCR', read: true },
    dfont: { head: 'DFONT', read: true },
    divx: { head: 'DIVX', read: true },
    djvu: { head: 'DJVU', read: true },
    dll: { head: 'DLL', read: true },
    dng: { head: 'DNG', read: true, write: true },
    doc: { head: 'DOC', read: true },
    docx: { head: 'DOCX', read: true },
    dpx: { head: 'DPX', read: true },
    dr4: { head: 'DR4', read: true, write: true, create: true },
    dss: { head: 'DSS', read: true },
    dv: { head: 'DV', read: true },
    dvb: { head: 'DVB', read: true, write: true },
    dvr_ms: { head: 'DVR-MS', read: true },
    dylib: { head: 'DYLIB', read: true },
    eip: { head: 'EIP', read: true },
    eps: { head: 'EPS', read: true, write: true },
    epub: { head: 'EPUB', read: true },
    erf: { head: 'ERF', read: true, write: true },
    exe: { head: 'EXE', read: true },
    exif: { head: 'EXIF', read: true, write: true, create: true },
    exr: { head: 'EXR', read: true },
    exv: { head: 'EXV', read: true, write: true, create: true },
    f4_a_v: { head: 'F4A/V', read: true, write: true },
    fff: { head: 'FFF', read: true, write: true },
    fits: { head: 'FITS', read: true },
    fla: { head: 'FLA', read: true },
    flac: { head: 'FLAC', read: true },
    flif: { head: 'FLIF', read: true, write: true },
    flv: { head: 'FLV', read: true },
    fpf: { head: 'FPF', read: true },
    fpx: { head: 'FPX', read: true },
    gif: { head: 'GIF', read: true, write: true },
    glv: { head: 'GLV', read: true, write: true },
    gpr: { head: 'GPR', read: true, write: true },
    gz: { head: 'GZ', read: true },
    hdp: { head: 'HDP', read: true, write: true },
    hdr: { head: 'HDR', read: true },
    heic: { head: 'HEIC', read: true, write: true },
    heif: { head: 'HEIF', read: true, write: true },
    html: { head: 'HTML', read: true },
    icc: { head: 'ICC', read: true, write: true, create: true },
    ico: { head: 'ICO', read: true },
    ics: { head: 'ICS', read: true },
    idml: { head: 'IDML', read: true },
    iiq: { head: 'IIQ', read: true, write: true },
    ind: { head: 'IND', read: true, write: true },
    insp: { head: 'INSP', read: true, write: true },
    insv: { head: 'INSV', read: true },
    inx: { head: 'INX', read: true },
    iso: { head: 'ISO', read: true },
    itc: { head: 'ITC', read: true },
    j2_c: { head: 'J2C', read: true },
    jng: { head: 'JNG', read: true, write: true },
    jp2: { head: 'JP2', read: true, write: true },
    jpeg: { head: 'JPEG', read: true, write: true },
    json: { head: 'JSON', read: true },
    jxl: { head: 'JXL', read: true },
    k25: { head: 'K25', read: true },
    kdc: { head: 'KDC', read: true },
    key: { head: 'KEY', read: true },
    la: { head: 'LA', read: true },
    lfp: { head: 'LFP', read: true },
    lif: { head: 'LIF', read: true },
    lnk: { head: 'LNK', read: true },
    lrv: { head: 'LRV', read: true, write: true },
    m2_ts: { head: 'M2TS', read: true },
    m4_a_v: { head: 'M4A/V', read: true, write: true },
    macos: { head: 'MACOS', read: true },
    max: { head: 'MAX', read: true },
    mef: { head: 'MEF', read: true, write: true },
    mie: { head: 'MIE', read: true, write: true, create: true },
    miff: { head: 'MIFF', read: true },
    mka: { head: 'MKA', read: true },
    mks: { head: 'MKS', read: true },
    mkv: { head: 'MKV', read: true },
    mng: { head: 'MNG', read: true, write: true },
    mobi: { head: 'MOBI', read: true },
    modd: { head: 'MODD', read: true },
    moi: { head: 'MOI', read: true },
    mos: { head: 'MOS', read: true, write: true },
    mov: { head: 'MOV', read: true, write: true },
    mp3: { head: 'MP3', read: true },
    mp4: { head: 'MP4', read: true, write: true },
    mpc: { head: 'MPC', read: true },
    mpg: { head: 'MPG', read: true },
    mpo: { head: 'MPO', read: true, write: true },
    mqv: { head: 'MQV', read: true, write: true },
    mrc: { head: 'MRC', read: true },
    mrw: { head: 'MRW', read: true, write: true },
    mxf: { head: 'MXF', read: true },
    nef: { head: 'NEF', read: true, write: true },
    nksc: { head: 'NKSC', read: true, write: true },
    nrw: { head: 'NRW', read: true, write: true },
    numbers: { head: 'NUMBERS', read: true },
    o: { head: 'O', read: true },
    odp: { head: 'ODP', read: true },
    ods: { head: 'ODS', read: true },
    odt: { head: 'ODT', read: true },
    ofr: { head: 'OFR', read: true },
    ogg: { head: 'OGG', read: true },
    ogv: { head: 'OGV', read: true },
    onp: { head: 'ONP', read: true },
    opus: { head: 'OPUS', read: true },
    orf: { head: 'ORF', read: true, write: true },
    ori: { head: 'ORI', read: true, write: true },
    otf: { head: 'OTF', read: true },
    pac: { head: 'PAC', read: true },
    pages: { head: 'PAGES', read: true },
    pbm: { head: 'PBM', read: true, write: true },
    pcd: { head: 'PCD', read: true },
    pcx: { head: 'PCX', read: true },
    pdb: { head: 'PDB', read: true },
    pdf: { head: 'PDF', read: true, write: true },
    pef: { head: 'PEF', read: true, write: true },
    pfa: { head: 'PFA', read: true },
    pfb: { head: 'PFB', read: true },
    pfm: { head: 'PFM', read: true },
    pgf: { head: 'PGF', read: true },
    pgm: { head: 'PGM', read: true, write: true },
    plist: { head: 'PLIST', read: true },
    pict: { head: 'PICT', read: true },
    pmp: { head: 'PMP', read: true },
    png: { head: 'PNG', read: true, write: true },
    ppm: { head: 'PPM', read: true, write: true },
    ppt: { head: 'PPT', read: true },
    pptx: { head: 'PPTX', read: true },
    ps: { head: 'PS', read: true, write: true },
    psb: { head: 'PSB', read: true, write: true },
    psd: { head: 'PSD', read: true, write: true },
    psp: { head: 'PSP', read: true },
    qtif: { head: 'QTIF', read: true, write: true },
    r3_d: { head: 'R3D', read: true },
    ra: { head: 'RA', read: true },
    raf: { head: 'RAF', read: true, write: true },
    ram: { head: 'RAM', read: true },
    rar: { head: 'RAR', read: true },
    raw: { head: 'RAW', read: true, write: true },
    riff: { head: 'RIFF', read: true },
    rsrc: { head: 'RSRC', read: true },
    rtf: { head: 'RTF', read: true },
    rw2: { head: 'RW2', read: true, write: true },
    rwl: { head: 'RWL', read: true, write: true },
    rwz: { head: 'RWZ', read: true },
    rm: { head: 'RM', read: true },
    seq: { head: 'SEQ', read: true },
    sketch: { head: 'SKETCH', read: true },
    so: { head: 'SO', read: true },
    sr2: { head: 'SR2', read: true, write: true },
    srf: { head: 'SRF', read: true },
    srw: { head: 'SRW', read: true, write: true },
    svg: { head: 'SVG', read: true },
    swf: { head: 'SWF', read: true },
    thm: { head: 'THM', read: true, write: true },
    tiff: { head: 'TIFF', read: true, write: true },
    torrent: { head: 'TORRENT', read: true },
    ttc: { head: 'TTC', read: true },
    ttf: { head: 'TTF', read: true },
    txt: { head: 'TXT', read: true },
    vcf: { head: 'VCF', read: true },
    vnt: { head: 'VNT', read: true },
    vrd: { head: 'VRD', read: true, write: true, create: true },
    vsd: { head: 'VSD', read: true },
    wav: { head: 'WAV', read: true },
    wdp: { head: 'WDP', read: true, write: true },
    webp: { head: 'WEBP', read: true, write: true },
    webm: { head: 'WEBM', read: true },
    wma: { head: 'WMA', read: true },
    wmv: { head: 'WMV', read: true },
    wpg: { head: 'WPG', read: true },
    wtv: { head: 'WTV', read: true },
    wv: { head: 'WV', read: true },
    x3_f: { head: 'X3F', read: true, write: true },
    xcf: { head: 'XCF', read: true },
    xisf: { head: 'XISF', read: true },
    xls: { head: 'XLS', read: true },
    xlsx: { head: 'XLSX', read: true },
    xmp: { head: 'XMP', read: true, write: true, create: true },
    zip: { head: 'ZIP', read: true },
  },
}

export const exiftool_tag_content: Hash = {
  form: 'hash',
  file: 'exiftool',
  bond: {
    head: { like: 'string' },
  },
  hash: EXIFTOOL_TAG,
}

// https://exiftool.org/TagNames/

export const exiftool_family_content: Hash = {
  form: 'hash',
  file: 'exiftool',
  bond: {
    head: { like: 'string' },
    family: { like: 'natural_number', list: true },
  },
  hash: {
    afcp: { head: 'AFCP', family: [0, 1] },
    aiff: { head: 'AIFF', family: [0, 1] },
    ape: { head: 'APE', family: [0, 1] },
    app0: { head: 'APP0', family: [0] },
    app1: { head: 'APP1', family: [0] },
    app11: { head: 'APP11', family: [0] },
    app12: { head: 'APP12', family: [0] },
    app13: { head: 'APP13', family: [0] },
    app14: { head: 'APP14', family: [0] },
    app15: { head: 'APP15', family: [0] },
    app2: { head: 'APP2', family: [0] },
    app3: { head: 'APP3', family: [0] },
    app4: { head: 'APP4', family: [0] },
    app5: { head: 'APP5', family: [0] },
    app6: { head: 'APP6', family: [0] },
    app7: { head: 'APP7', family: [0] },
    app8: { head: 'APP8', family: [0] },
    app9: { head: 'APP9', family: [0] },
    asf: { head: 'ASF', family: [0, 1] },
    audible: { head: 'Audible', family: [0, 1] },
    canon: { head: 'Canon', family: [0, 1] },
    canon_vrd: { head: 'CanonVRD', family: [0, 1] },
    composite: { head: 'Composite', family: [0, 1] },
    dicom: { head: 'DICOM', family: [0, 1] },
    dng: { head: 'DNG', family: [0, 1] },
    dv: { head: 'DV', family: [0, 1] },
    dj_vu: { head: 'DjVu', family: [0, 1] },
    ducky: { head: 'Ducky', family: [0, 1] },
    exe: { head: 'EXE', family: [0, 1] },
    exif: { head: 'EXIF', family: [0, 1] },
    exif_tool: { head: 'ExifTool', family: [0, 1] },
    fits: { head: 'FITS', family: [0, 1] },
    flac: { head: 'FLAC', family: [0, 1] },
    flir: { head: 'FLIR', family: [0, 1] },
    file: { head: 'File', family: [0, 1] },
    flash: { head: 'Flash', family: [0, 1] },
    flash_pix: { head: 'FlashPix', family: [0, 1] },
    font: { head: 'Font', family: [0, 1] },
    foto_station: { head: 'FotoStation', family: [0, 1] },
    gif: { head: 'GIF', family: [0, 1] },
    gimp: { head: 'GIMP', family: [0, 1] },
    geo_tiff: { head: 'GeoTiff', family: [0, 1] },
    go_pro: { head: 'GoPro', family: [0, 1] },
    h264: { head: 'H264', family: [0, 1] },
    html: { head: 'HTML', family: [0, 1] },
    icc_profile: { head: 'ICC_Profile#', family: [0, 1] },
    id3: { head: 'ID3', family: [0, 1] },
    iptc: { head: 'IPTC#', family: [0, 1] },
    iso: { head: 'ISO', family: [0, 1] },
    itc: { head: 'ITC', family: [0, 1] },
    jfif: { head: 'JFIF', family: [0, 1] },
    jpeg: { head: 'JPEG', family: [0, 1] },
    json: { head: 'JSON', family: [0, 1] },
    jumbf: { head: 'JUMBF', family: [0, 1] },
    jpeg2000: { head: 'Jpeg2000', family: [0, 1] },
    lnk: { head: 'LNK', family: [0, 1] },
    leaf: { head: 'Leaf', family: [0, 1] },
    lytro: { head: 'Lytro', family: [0, 1] },
    m2_ts: { head: 'M2TS', family: [0, 1] },
    mie: { head: 'MIE', family: [0] },
    miff: { head: 'MIFF', family: [0, 1] },
    misb: { head: 'MISB', family: [0, 1] },
    mng: { head: 'MNG', family: [0, 1] },
    moi: { head: 'MOI', family: [0, 1] },
    mpc: { head: 'MPC', family: [0, 1] },
    mpeg: { head: 'MPEG', family: [0, 1] },
    mpf: { head: 'MPF', family: [0] },
    mxf: { head: 'MXF', family: [0, 1] },
    maker_notes: { head: 'MakerNotes', family: [0, 1] },
    matroska: { head: 'Matroska', family: [0, 1] },
    meta: { head: 'Meta', family: [0, 1] },
    ogg: { head: 'Ogg', family: [0, 1] },
    open_exr: { head: 'OpenEXR', family: [0, 1] },
    opus: { head: 'Opus', family: [0, 1] },
    pdf: { head: 'PDF', family: [0, 1] },
    pict: { head: 'PICT', family: [0, 1] },
    plist: { head: 'PLIST', family: [0] },
    png: { head: 'PNG', family: [0, 1] },
    psp: { head: 'PSP', family: [0, 1] },
    palm: { head: 'Palm', family: [0, 1] },
    panasonic_raw: { head: 'PanasonicRaw', family: [0, 1] },
    parrot: { head: 'Parrot', family: [0, 1] },
    photo_cd: { head: 'PhotoCD', family: [0, 1] },
    photo_mechanic: { head: 'PhotoMechanic', family: [0, 1] },
    photoshop: { head: 'Photoshop', family: [0, 1] },
    post_script: { head: 'PostScript', family: [0, 1] },
    print_im: { head: 'PrintIM', family: [0, 1] },
    quick_time: { head: 'QuickTime', family: [0, 1] },
    raf: { head: 'RAF', family: [0, 1] },
    riff: { head: 'RIFF', family: [0, 1] },
    rsrc: { head: 'RSRC', family: [0, 1] },
    rtf: { head: 'RTF', family: [0, 1] },
    radiance: { head: 'Radiance', family: [0, 1] },
    rawzor: { head: 'Rawzor', family: [0, 1] },
    real: { head: 'Real', family: [0, 1] },
    red: { head: 'Red', family: [0, 1] },
    svg: { head: 'SVG', family: [0, 1] },
    sigma_raw: { head: 'SigmaRaw', family: [0, 1] },
    sony: { head: 'Sony', family: [0, 1] },
    stim: { head: 'Stim', family: [0, 1] },
    theora: { head: 'Theora', family: [0, 1] },
    torrent: { head: 'Torrent', family: [0, 1] },
    trailer: { head: 'Trailer', family: [0] },
    v_card: { head: 'VCard', family: [0, 1] },
    vorbis: { head: 'Vorbis', family: [0, 1] },
    wtv: { head: 'WTV', family: [0, 1] },
    xml: { head: 'XML', family: [0, 1] },
    xmp: { head: 'XMP', family: [0, 1] },
    zip: { head: 'ZIP', family: [0, 1] },
    ac3: { head: 'AC3', family: [1] },
    avi1: { head: 'AVI1', family: [1] },
    adobe: { head: 'Adobe', family: [1] },
    adobe_cm: { head: 'AdobeCM', family: [1] },
    adobe_dng: { head: 'AdobeDNG', family: [1] },
    apple: { head: 'Apple', family: [1] },
    cbor: { head: 'CBOR', family: [1] },
    ciff: { head: 'CIFF', family: [1] },
    camera_ifd: { head: 'CameraIFD', family: [1] },
    canon_custom: { head: 'CanonCustom', family: [1] },
    canon_dr4: { head: 'CanonDR4', family: [1] },
    canon_raw: { head: 'CanonRaw', family: [1] },
    casio: { head: 'Casio', family: [1] },
    chapter: { head: 'Chapter#', family: [1] },
    dji: { head: 'DJI', family: [1] },
    dj_vu_meta: { head: 'DjVu-Meta', family: [1] },
    eppim: { head: 'EPPIM', family: [1] },
    exif_ifd: { head: 'ExifIFD', family: [1] },
    fuji_film: { head: 'FujiFilm', family: [1] },
    fuji_ifd: { head: 'FujiIFD', family: [1] },
    ge: { head: 'GE', family: [1] },
    gps: { head: 'GPS', family: [1] },
    g_spherical: { head: 'GSpherical', family: [1] },
    garmin: { head: 'Garmin', family: [1] },
    glob_param_ifd: { head: 'GlobParamIFD', family: [1] },
    graph_conv: { head: 'GraphConv', family: [1] },
    hp: { head: 'HP', family: [1] },
    htc: { head: 'HTC', family: [1] },
    html_dc: { head: 'HTML-dc', family: [1] },
    html_ncc: { head: 'HTML-ncc', family: [1] },
    html_office: { head: 'HTML-office', family: [1] },
    html_prod: { head: 'HTML-prod', family: [1] },
    html_vw96: { head: 'HTML-vw96', family: [1] },
    http_equiv: { head: 'HTTP-equiv', family: [1] },
    icc_chrm: { head: 'ICC-chrm', family: [1] },
    icc_clrt: { head: 'ICC-clrt', family: [1] },
    icc_header: { head: 'ICC-header', family: [1] },
    icc_meas: { head: 'ICC-meas', family: [1] },
    icc_meta: { head: 'ICC-meta', family: [1] },
    icc_view: { head: 'ICC-view', family: [1] },
    id3v1: { head: 'ID3v1', family: [1] },
    id3v1_enh: { head: 'ID3v1_Enh', family: [1] },
    id3v2_2: { head: 'ID3v2_2', family: [1] },
    id3v2_3: { head: 'ID3v2_3', family: [1] },
    id3v2_4: { head: 'ID3v2_4', family: [1] },
    ifd0: { head: 'IFD0', family: [1] },
    ifd1: { head: 'IFD1', family: [1] },
    infi_ray: { head: 'InfiRay', family: [1] },
    insta360: { head: 'Insta360', family: [1] },
    interop_ifd: { head: 'InteropIFD', family: [1] },
    item_list: { head: 'ItemList', family: [1] },
    jfxx: { head: 'JFXX', family: [1] },
    jpeg_hdr: { head: 'JPEG-HDR', family: [1] },
    jps: { head: 'JPS', family: [1] },
    jvc: { head: 'JVC', family: [1] },
    kdc_ifd: { head: 'KDC_IFD', family: [1] },
    keys: { head: 'Keys', family: [1] },
    kodak: { head: 'Kodak', family: [1] },
    kodak_borders_ifd: { head: 'KodakBordersIFD', family: [1] },
    kodak_effects_ifd: { head: 'KodakEffectsIFD', family: [1] },
    kodak_ifd: { head: 'KodakIFD', family: [1] },
    kyocera_raw: { head: 'KyoceraRaw', family: [1] },
    leaf_sub_ifd: { head: 'LeafSubIFD', family: [1] },
    leica: { head: 'Leica', family: [1] },
    lyrics3: { head: 'Lyrics3', family: [1] },
    m_raw: { head: 'M-RAW', family: [1] },
    mac: { head: 'MAC', family: [1] },
    mie_audio: { head: 'MIE-Audio', family: [1] },
    mie_camera: { head: 'MIE-Camera', family: [1] },
    mie_canon: { head: 'MIE-Canon', family: [1] },
    mie_doc: { head: 'MIE-Doc', family: [1] },
    mie_extender: { head: 'MIE-Extender', family: [1] },
    mie_flash: { head: 'MIE-Flash', family: [1] },
    mie_gps: { head: 'MIE-GPS', family: [1] },
    mie_geo: { head: 'MIE-Geo', family: [1] },
    mie_image: { head: 'MIE-Image', family: [1] },
    mie_lens: { head: 'MIE-Lens', family: [1] },
    mie_main: { head: 'MIE-Main', family: [1] },
    mie_maker_notes: { head: 'MIE-MakerNotes', family: [1] },
    mie_meta: { head: 'MIE-Meta', family: [1] },
    mie_orient: { head: 'MIE-Orient', family: [1] },
    mie_preview: { head: 'MIE-Preview', family: [1] },
    mie_thumbnail: { head: 'MIE-Thumbnail', family: [1] },
    mie_utm: { head: 'MIE-UTM', family: [1] },
    mie_unknown: { head: 'MIE-Unknown', family: [1] },
    mie_video: { head: 'MIE-Video', family: [1] },
    mobi: { head: 'MOBI', family: [1] },
    mpf0: { head: 'MPF0', family: [1] },
    mp_image: { head: 'MPImage', family: [1] },
    ms_doc: { head: 'MS-DOC', family: [1] },
    mac_os: { head: 'MacOS', family: [1] },
    maker_unknown: { head: 'MakerUnknown', family: [1] },
    media_jukebox: { head: 'MediaJukebox', family: [1] },
    meta_ifd: { head: 'MetaIFD', family: [1] },
    microsoft: { head: 'Microsoft', family: [1] },
    minolta: { head: 'Minolta', family: [1] },
    minolta_raw: { head: 'MinoltaRaw', family: [1] },
    motorola: { head: 'Motorola', family: [1] },
    nitf: { head: 'NITF', family: [1] },
    nikon: { head: 'Nikon', family: [1] },
    nikon_capture: { head: 'NikonCapture', family: [1] },
    nikon_custom: { head: 'NikonCustom', family: [1] },
    nikon_scan: { head: 'NikonScan', family: [1] },
    nikon_settings: { head: 'NikonSettings', family: [1] },
    nine_edits: { head: 'NineEdits', family: [1] },
    nintendo: { head: 'Nintendo', family: [1] },
    ocad: { head: 'Ocad', family: [1] },
    olympus: { head: 'Olympus', family: [1] },
    png_c_icp: { head: 'PNG-cICP', family: [1] },
    png_p_h_ys: { head: 'PNG-pHYs', family: [1] },
    panasonic: { head: 'Panasonic', family: [1] },
    pentax: { head: 'Pentax', family: [1] },
    phase_one: { head: 'PhaseOne', family: [1] },
    picture_info: { head: 'PictureInfo', family: [1] },
    preview_ifd: { head: 'PreviewIFD', family: [1] },
    profile_ifd: { head: 'ProfileIFD', family: [1] },
    qualcomm: { head: 'Qualcomm', family: [1] },
    raf2: { head: 'RAF2', family: [1] },
    rmeta: { head: 'RMETA', family: [1] },
    real_cont: { head: 'Real-CONT', family: [1] },
    real_mdpr: { head: 'Real-MDPR', family: [1] },
    real_prop: { head: 'Real-PROP', family: [1] },
    real_ra3: { head: 'Real-RA3', family: [1] },
    real_ra4: { head: 'Real-RA4', family: [1] },
    real_ra5: { head: 'Real-RA5', family: [1] },
    real_rjmd: { head: 'Real-RJMD', family: [1] },
    reconyx: { head: 'Reconyx', family: [1] },
    ricoh: { head: 'Ricoh', family: [1] },
    spiff: { head: 'SPIFF', family: [1] },
    sr2: { head: 'SR2', family: [1] },
    sr2_data_ifd: { head: 'SR2DataIFD', family: [1] },
    sr2_sub_ifd: { head: 'SR2SubIFD', family: [1] },
    srf: { head: 'SRF#', family: [1] },
    samsung: { head: 'Samsung', family: [1] },
    sanyo: { head: 'Sanyo', family: [1] },
    scalado: { head: 'Scalado', family: [1] },
    sigma: { head: 'Sigma', family: [1] },
    sony_idc: { head: 'SonyIDC', family: [1] },
    sub_ifd: { head: 'SubIFD', family: [1] },
    system: { head: 'System', family: [1] },
    track: { head: 'Track#', family: [1] },
    user_data: { head: 'UserData', family: [1] },
    v_calendar: { head: 'VCalendar', family: [1] },
    v_note: { head: 'VNote', family: [1] },
    version0: { head: 'Version0', family: [1] },
    xmp_dicom: { head: 'XMP-DICOM', family: [1] },
    xmp_device: { head: 'XMP-Device', family: [1] },
    xmp_g_audio: { head: 'XMP-GAudio', family: [1] },
    xmp_g_camera: { head: 'XMP-GCamera', family: [1] },
    xmp_g_creations: { head: 'XMP-GCreations', family: [1] },
    xmp_g_depth: { head: 'XMP-GDepth', family: [1] },
    xmp_g_focus: { head: 'XMP-GFocus', family: [1] },
    xmp_g_image: { head: 'XMP-GImage', family: [1] },
    xmp_g_pano: { head: 'XMP-GPano', family: [1] },
    xmp_g_spherical: { head: 'XMP-GSpherical', family: [1] },
    xmp_l_image: { head: 'XMP-LImage', family: [1] },
    xmp_mp: { head: 'XMP-MP', family: [1] },
    xmp_mp1: { head: 'XMP-MP1', family: [1] },
    xmp_pixel_live: { head: 'XMP-PixelLive', family: [1] },
    xmp_aas: { head: 'XMP-aas', family: [1] },
    xmp_acdsee: { head: 'XMP-acdsee', family: [1] },
    xmp_album: { head: 'XMP-album', family: [1] },
    xmp_apple_fi: { head: 'XMP-apple-fi', family: [1] },
    xmp_ast: { head: 'XMP-ast', family: [1] },
    xmp_aux: { head: 'XMP-aux', family: [1] },
    xmp_cc: { head: 'XMP-cc', family: [1] },
    xmp_cell: { head: 'XMP-cell', family: [1] },
    xmp_crd: { head: 'XMP-crd', family: [1] },
    xmp_creator_atom: { head: 'XMP-creatorAtom', family: [1] },
    xmp_crs: { head: 'XMP-crs', family: [1] },
    xmp_dc: { head: 'XMP-dc', family: [1] },
    xmp_dex: { head: 'XMP-dex', family: [1] },
    xmp_digi_kam: { head: 'XMP-digiKam', family: [1] },
    xmp_drone_dji: { head: 'XMP-drone-dji', family: [1] },
    xmp_dwc: { head: 'XMP-dwc', family: [1] },
    xmp_et: { head: 'XMP-et', family: [1] },
    xmp_exif: { head: 'XMP-exif', family: [1] },
    xmp_exif_ex: { head: 'XMP-exifEX', family: [1] },
    xmp_expressionmedia: { head: 'XMP-expressionmedia', family: [1] },
    xmp_extensis: { head: 'XMP-extensis', family: [1] },
    xmp_fpv: { head: 'XMP-fpv', family: [1] },
    xmp_getty: { head: 'XMP-getty', family: [1] },
    xmp_hdr: { head: 'XMP-hdr', family: [1] },
    xmp_hdrgm: { head: 'XMP-hdrgm', family: [1] },
    xmp_ics: { head: 'XMP-ics', family: [1] },
    xmp_iptc_core: { head: 'XMP-iptcCore', family: [1] },
    xmp_iptc_ext: { head: 'XMP-iptcExt', family: [1] },
    xmp_lr: { head: 'XMP-lr', family: [1] },
    xmp_mediapro: { head: 'XMP-mediapro', family: [1] },
    xmp_microsoft: { head: 'XMP-microsoft', family: [1] },
    xmp_mwg_coll: { head: 'XMP-mwg-coll', family: [1] },
    xmp_mwg_kw: { head: 'XMP-mwg-kw', family: [1] },
    xmp_mwg_rs: { head: 'XMP-mwg-rs', family: [1] },
    xmp_nine: { head: 'XMP-nine', family: [1] },
    xmp_panorama: { head: 'XMP-panorama', family: [1] },
    xmp_pdf: { head: 'XMP-pdf', family: [1] },
    xmp_pdfx: { head: 'XMP-pdfx', family: [1] },
    xmp_photomech: { head: 'XMP-photomech', family: [1] },
    xmp_photoshop: { head: 'XMP-photoshop', family: [1] },
    xmp_plus: { head: 'XMP-plus', family: [1] },
    xmp_pmi: { head: 'XMP-pmi', family: [1] },
    xmp_prism: { head: 'XMP-prism', family: [1] },
    xmp_prl: { head: 'XMP-prl', family: [1] },
    xmp_prm: { head: 'XMP-prm', family: [1] },
    xmp_pur: { head: 'XMP-pur', family: [1] },
    xmp_rdf: { head: 'XMP-rdf', family: [1] },
    xmp_sdc: { head: 'XMP-sdc', family: [1] },
    xmp_swf: { head: 'XMP-swf', family: [1] },
    xmp_tiff: { head: 'XMP-tiff', family: [1] },
    xmp_x: { head: 'XMP-x', family: [1] },
    xmp_xmp: { head: 'XMP-xmp', family: [1] },
    xmp_xmp_bj: { head: 'XMP-xmpBJ', family: [1] },
    xmp_xmp_dm: { head: 'XMP-xmpDM', family: [1] },
    xmp_xmp_mm: { head: 'XMP-xmpMM', family: [1] },
    xmp_xmp_note: { head: 'XMP-xmpNote', family: [1] },
    xmp_xmp_plus: { head: 'XMP-xmpPLUS', family: [1] },
    xmp_xmp_rights: { head: 'XMP-xmpRights', family: [1] },
    xmp_xmp_t_pg: { head: 'XMP-xmpTPg', family: [1] },
    i_tunes: { head: 'iTunes', family: [1] },
  },
}
