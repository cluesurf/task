import _ from 'lodash'

import { FfmpegStrictOption } from '~/code/type/shared/base/cast'

export type FfmpegCodecContentValue = {
  label: string
  type?: string
  supportsDecoding: boolean
  supportsEncoding: boolean
  intraFrameOnly: boolean
  lossy: boolean
  lossless: boolean
}

export type FfmpegCodecContentKey =
  | '012v'
  | '4xm'
  | '8bps'
  | 'a64_multi'
  | 'a64_multi5'
  | 'aasc'
  | 'agm'
  | 'aic'
  | 'alias_pix'
  | 'amv'
  | 'anm'
  | 'ansi'
  | 'apng'
  | 'arbc'
  | 'argo'
  | 'asv1'
  | 'asv2'
  | 'aura'
  | 'aura2'
  | 'av1'
  | 'avrn'
  | 'avrp'
  | 'avs'
  | 'avs2'
  | 'avs3'
  | 'avui'
  | 'ayuv'
  | 'bethsoftvid'
  | 'bfi'
  | 'binkvideo'
  | 'bintext'
  | 'bitpacked'
  | 'bmp'
  | 'bmv_video'
  | 'brender_pix'
  | 'c93'
  | 'cavs'
  | 'cdgraphics'
  | 'cdtoons'
  | 'cdxl'
  | 'cfhd'
  | 'cinepak'
  | 'clearvideo'
  | 'cljr'
  | 'cllc'
  | 'cmv'
  | 'cpia'
  | 'cri'
  | 'cscd'
  | 'cyuv'
  | 'daala'
  | 'dds'
  | 'dfa'
  | 'dirac'
  | 'dnxhd'
  | 'dpx'
  | 'dsicinvideo'
  | 'dvvideo'
  | 'dxa'
  | 'dxtory'
  | 'dxv'
  | 'escape124'
  | 'escape130'
  | 'evc'
  | 'exr'
  | 'ffv1'
  | 'ffvhuff'
  | 'fic'
  | 'fits'
  | 'flashsv'
  | 'flashsv2'
  | 'flic'
  | 'flv1'
  | 'fmvc'
  | 'fraps'
  | 'frwu'
  | 'g2m'
  | 'gdv'
  | 'gem'
  | 'gif'
  | 'h261'
  | 'h263'
  | 'h263i'
  | 'h263p'
  | 'h264'
  | 'hap'
  | 'hdr'
  | 'hevc'
  | 'hnm4video'
  | 'hq_hqa'
  | 'hqx'
  | 'huffyuv'
  | 'hymt'
  | 'idcin'
  | 'idf'
  | 'iff_ilbm'
  | 'imm4'
  | 'imm5'
  | 'indeo2'
  | 'indeo3'
  | 'indeo4'
  | 'indeo5'
  | 'interplayvideo'
  | 'ipu'
  | 'jpeg2000'
  | 'jpegls'
  | 'jpegxl'
  | 'jv'
  | 'kgv1'
  | 'kmvc'
  | 'lagarith'
  | 'ljpeg'
  | 'loco'
  | 'lscr'
  | 'm101'
  | 'mad'
  | 'magicyuv'
  | 'mdec'
  | 'media100'
  | 'mimic'
  | 'mjpeg'
  | 'mjpegb'
  | 'mmvideo'
  | 'mobiclip'
  | 'motionpixels'
  | 'mpeg1video'
  | 'mpeg2video'
  | 'mpeg4'
  | 'msa1'
  | 'mscc'
  | 'msmpeg4v1'
  | 'msmpeg4v2'
  | 'msmpeg4v3'
  | 'msp2'
  | 'msrle'
  | 'mss1'
  | 'mss2'
  | 'msvideo1'
  | 'mszh'
  | 'mts2'
  | 'mv30'
  | 'mvc1'
  | 'mvc2'
  | 'mvdv'
  | 'mvha'
  | 'mwsc'
  | 'mxpeg'
  | 'notchlc'
  | 'nuv'
  | 'paf_video'
  | 'pam'
  | 'pbm'
  | 'pcx'
  | 'pdv'
  | 'pfm'
  | 'pgm'
  | 'pgmyuv'
  | 'pgx'
  | 'phm'
  | 'photocd'
  | 'pictor'
  | 'pixlet'
  | 'png'
  | 'ppm'
  | 'prores'
  | 'prosumer'
  | 'psd'
  | 'ptx'
  | 'qdraw'
  | 'qoi'
  | 'qpeg'
  | 'qtrle'
  | 'r10k'
  | 'r210'
  | 'rasc'
  | 'rawvideo'
  | 'rl2'
  | 'roq'
  | 'rpza'
  | 'rscc'
  | 'rtv1'
  | 'rv10'
  | 'rv20'
  | 'rv30'
  | 'rv40'
  | 'sanm'
  | 'scpr'
  | 'screenpresso'
  | 'sga'
  | 'sgi'
  | 'sgirle'
  | 'sheervideo'
  | 'simbiosis_imx'
  | 'smackvideo'
  | 'smc'
  | 'smvjpeg'
  | 'snow'
  | 'sp5x'
  | 'speedhq'
  | 'srgc'
  | 'sunrast'
  | 'svg'
  | 'svq1'
  | 'svq3'
  | 'targa'
  | 'targa_y216'
  | 'tdsc'
  | 'tgq'
  | 'tgv'
  | 'theora'
  | 'thp'
  | 'tiertexseqvideo'
  | 'tiff'
  | 'tmv'
  | 'tqi'
  | 'truemotion1'
  | 'truemotion2'
  | 'truemotion2rt'
  | 'tscc'
  | 'tscc2'
  | 'txd'
  | 'ulti'
  | 'utvideo'
  | 'v210'
  | 'v210x'
  | 'v308'
  | 'v408'
  | 'v410'
  | 'vb'
  | 'vble'
  | 'vbn'
  | 'vc1'
  | 'vc1image'
  | 'vcr1'
  | 'vixl'
  | 'vmdvideo'
  | 'vmix'
  | 'vmnc'
  | 'vnull'
  | 'vp3'
  | 'vp4'
  | 'vp5'
  | 'vp6'
  | 'vp6a'
  | 'vp6f'
  | 'vp7'
  | 'vp8'
  | 'vp9'
  | 'vqc'
  | 'vvc'
  | 'wbmp'
  | 'wcmv'
  | 'webp'
  | 'wmv1'
  | 'wmv2'
  | 'wmv3'
  | 'wmv3image'
  | 'wnv1'
  | 'wrapped_avframe'
  | 'ws_vqa'
  | 'xan_wc3'
  | 'xan_wc4'
  | 'xbin'
  | 'xbm'
  | 'xface'
  | 'xpm'
  | 'xwd'
  | 'y41p'
  | 'ylc'
  | 'yop'
  | 'yuv4'
  | 'zerocodec'
  | 'zlib'
  | 'zmbv'
  | '4gv'
  | '8svx_exp'
  | '8svx_fib'
  | 'aac'
  | 'aac_latm'
  | 'ac3'
  | 'ac4'
  | 'acelp.kelvin'
  | 'adpcm_4xm'
  | 'adpcm_adx'
  | 'adpcm_afc'
  | 'adpcm_agm'
  | 'adpcm_aica'
  | 'adpcm_argo'
  | 'adpcm_ct'
  | 'adpcm_dtk'
  | 'adpcm_ea'
  | 'adpcm_ea_maxis_xa'
  | 'adpcm_ea_r1'
  | 'adpcm_ea_r2'
  | 'adpcm_ea_r3'
  | 'adpcm_ea_xas'
  | 'adpcm_g722'
  | 'adpcm_g726'
  | 'adpcm_g726le'
  | 'adpcm_ima_acorn'
  | 'adpcm_ima_alp'
  | 'adpcm_ima_amv'
  | 'adpcm_ima_apc'
  | 'adpcm_ima_apm'
  | 'adpcm_ima_cunning'
  | 'adpcm_ima_dat4'
  | 'adpcm_ima_dk3'
  | 'adpcm_ima_dk4'
  | 'adpcm_ima_ea_eacs'
  | 'adpcm_ima_ea_sead'
  | 'adpcm_ima_iss'
  | 'adpcm_ima_moflex'
  | 'adpcm_ima_mtf'
  | 'adpcm_ima_oki'
  | 'adpcm_ima_qt'
  | 'adpcm_ima_rad'
  | 'adpcm_ima_smjpeg'
  | 'adpcm_ima_ssi'
  | 'adpcm_ima_wav'
  | 'adpcm_ima_ws'
  | 'adpcm_ms'
  | 'adpcm_mtaf'
  | 'adpcm_psx'
  | 'adpcm_sbpro_2'
  | 'adpcm_sbpro_3'
  | 'adpcm_sbpro_4'
  | 'adpcm_swf'
  | 'adpcm_thp'
  | 'adpcm_thp_le'
  | 'adpcm_vima'
  | 'adpcm_xa'
  | 'adpcm_xmd'
  | 'adpcm_yamaha'
  | 'adpcm_zork'
  | 'alac'
  | 'amr_nb'
  | 'amr_wb'
  | 'anull'
  | 'apac'
  | 'ape'
  | 'aptx'
  | 'aptx_hd'
  | 'atrac1'
  | 'atrac3'
  | 'atrac3al'
  | 'atrac3p'
  | 'atrac3pal'
  | 'atrac9'
  | 'avc'
  | 'binkaudio_dct'
  | 'binkaudio_rdft'
  | 'bmv_audio'
  | 'bonk'
  | 'cbd2_dpcm'
  | 'celt'
  | 'codec2'
  | 'comfortnoise'
  | 'cook'
  | 'derf_dpcm'
  | 'dfpwm'
  | 'dolby_e'
  | 'dsd_lsbf'
  | 'dsd_lsbf_planar'
  | 'dsd_msbf'
  | 'dsd_msbf_planar'
  | 'dsicinaudio'
  | 'dss_sp'
  | 'dst'
  | 'dts'
  | 'dvaudio'
  | 'eac3'
  | 'evrc'
  | 'fastaudio'
  | 'flac'
  | 'ftr'
  | 'g723_1'
  | 'g729'
  | 'gremlin_dpcm'
  | 'gsm'
  | 'gsm_ms'
  | 'hca'
  | 'hcom'
  | 'iac'
  | 'ilbc'
  | 'imc'
  | 'interplay_dpcm'
  | 'interplayacm'
  | 'mace3'
  | 'mace6'
  | 'metasound'
  | 'misc4'
  | 'mlp'
  | 'mp1'
  | 'mp2'
  | 'mp3'
  | 'mp3adu'
  | 'mp3on4'
  | 'mp4als'
  | 'mpegh_3d_audio'
  | 'msnsiren'
  | 'musepack7'
  | 'musepack8'
  | 'nellymoser'
  | 'opus'
  | 'osq'
  | 'paf_audio'
  | 'pcm_alaw'
  | 'pcm_bluray'
  | 'pcm_dvd'
  | 'pcm_f16le'
  | 'pcm_f24le'
  | 'pcm_f32be'
  | 'pcm_f32le'
  | 'pcm_f64be'
  | 'pcm_f64le'
  | 'pcm_lxf'
  | 'pcm_mulaw'
  | 'pcm_s16be'
  | 'pcm_s16be_planar'
  | 'pcm_s16le'
  | 'pcm_s16le_planar'
  | 'pcm_s24be'
  | 'pcm_s24daud'
  | 'pcm_s24le'
  | 'pcm_s24le_planar'
  | 'pcm_s32be'
  | 'pcm_s32le'
  | 'pcm_s32le_planar'
  | 'pcm_s64be'
  | 'pcm_s64le'
  | 'pcm_s8'
  | 'pcm_s8_planar'
  | 'pcm_sga'
  | 'pcm_u16be'
  | 'pcm_u16le'
  | 'pcm_u24be'
  | 'pcm_u24le'
  | 'pcm_u32be'
  | 'pcm_u32le'
  | 'pcm_u8'
  | 'pcm_vidc'
  | 'qcelp'
  | 'qdm2'
  | 'qdmc'
  | 'ra_144'
  | 'ra_288'
  | 'ralf'
  | 'rka'
  | 'roq_dpcm'
  | 's302m'
  | 'sbc'
  | 'sdx2_dpcm'
  | 'shorten'
  | 'sipr'
  | 'siren'
  | 'smackaudio'
  | 'smv'
  | 'sol_dpcm'
  | 'sonic'
  | 'sonicls'
  | 'speex'
  | 'tak'
  | 'truehd'
  | 'truespeech'
  | 'tta'
  | 'twinvq'
  | 'vmdaudio'
  | 'vorbis'
  | 'wady_dpcm'
  | 'wavarc'
  | 'wavesynth'
  | 'wavpack'
  | 'westwood_snd1'
  | 'wmalossless'
  | 'wmapro'
  | 'wmav1'
  | 'wmav2'
  | 'wmavoice'
  | 'xan_dpcm'
  | 'xma1'
  | 'xma2'
  | 'bin_data'
  | 'dvd_nav_packet'
  | 'epg'
  | 'klv'
  | 'mpegts'
  | 'otf'
  | 'scte_35'
  | 'smpte_2038'
  | 'timed_id3'
  | 'ttf'
  | 'arib_caption'
  | 'ass'
  | 'dvb_subtitle'
  | 'dvb_teletext'
  | 'dvd_subtitle'
  | 'eia_608'
  | 'hdmv_pgs_subtitle'
  | 'hdmv_text_subtitle'
  | 'jacosub'
  | 'microdvd'
  | 'mov_text'
  | 'mpl2'
  | 'pjs'
  | 'realtext'
  | 'sami'
  | 'srt'
  | 'ssa'
  | 'stl'
  | 'subrip'
  | 'subviewer'
  | 'subviewer1'
  | 'text'
  | 'ttml'
  | 'vplayer'
  | 'webvtt'
  | 'xsub'

export type FfmpegCodecContent = Record<
  FfmpegCodecContentKey,
  FfmpegCodecContentValue
>
export type FfmpegDecoderContentValue = {
  label: string
  type: string
  frameLevelMultithreading: boolean
  sliceLevelMultithreading: boolean
  experimental: boolean
  supportsDrawHorizontalBand: boolean
  supportsDirectRenderingMethod1: boolean
}

export type FfmpegDecoderContentKey =
  | '012v'
  | '4xm'
  | '8bps'
  | 'aasc'
  | 'agm'
  | 'aic'
  | 'alias_pix'
  | 'amv'
  | 'anm'
  | 'ansi'
  | 'apng'
  | 'arbc'
  | 'argo'
  | 'asv1'
  | 'asv2'
  | 'aura'
  | 'aura2'
  | 'libdav1d'
  | 'libaom-av1'
  | 'av1'
  | 'avrn'
  | 'avrp'
  | 'avs'
  | 'avui'
  | 'ayuv'
  | 'bethsoftvid'
  | 'bfi'
  | 'binkvideo'
  | 'bintext'
  | 'bitpacked'
  | 'bmp'
  | 'bmv_video'
  | 'brender_pix'
  | 'c93'
  | 'cavs'
  | 'cdgraphics'
  | 'cdtoons'
  | 'cdxl'
  | 'cfhd'
  | 'cinepak'
  | 'clearvideo'
  | 'cljr'
  | 'cllc'
  | 'eacmv'
  | 'cpia'
  | 'cri'
  | 'camstudio'
  | 'cyuv'
  | 'dds'
  | 'dfa'
  | 'dirac'
  | 'dnxhd'
  | 'dpx'
  | 'dsicinvideo'
  | 'dvvideo'
  | 'dxa'
  | 'dxtory'
  | 'dxv'
  | 'escape124'
  | 'escape130'
  | 'exr'
  | 'ffv1'
  | 'ffvhuff'
  | 'fic'
  | 'fits'
  | 'flashsv'
  | 'flashsv2'
  | 'flic'
  | 'flv'
  | 'fmvc'
  | 'fraps'
  | 'frwu'
  | 'g2m'
  | 'gdv'
  | 'gem'
  | 'gif'
  | 'h261'
  | 'h263'
  | 'h263i'
  | 'h263p'
  | 'h264'
  | 'hap'
  | 'hdr'
  | 'hevc'
  | 'hnm4video'
  | 'hq_hqa'
  | 'hqx'
  | 'huffyuv'
  | 'hymt'
  | 'idcinvideo'
  | 'idf'
  | 'iff'
  | 'imm4'
  | 'imm5'
  | 'indeo2'
  | 'indeo3'
  | 'indeo4'
  | 'indeo5'
  | 'interplayvideo'
  | 'ipu'
  | 'jpeg2000'
  | 'jpegls'
  | 'libjxl'
  | 'jv'
  | 'kgv1'
  | 'kmvc'
  | 'lagarith'
  | 'loco'
  | 'lscr'
  | 'm101'
  | 'eamad'
  | 'magicyuv'
  | 'mdec'
  | 'media100'
  | 'mimic'
  | 'mjpeg'
  | 'mjpegb'
  | 'mmvideo'
  | 'mobiclip'
  | 'motionpixels'
  | 'mpeg1video'
  | 'mpeg2video'
  | 'mpegvideo'
  | 'mpeg4'
  | 'msa1'
  | 'mscc'
  | 'msmpeg4v1'
  | 'msmpeg4v2'
  | 'msmpeg4'
  | 'msp2'
  | 'msrle'
  | 'mss1'
  | 'mss2'
  | 'msvideo1'
  | 'mszh'
  | 'mts2'
  | 'mv30'
  | 'mvc1'
  | 'mvc2'
  | 'mvdv'
  | 'mvha'
  | 'mwsc'
  | 'mxpeg'
  | 'notchlc'
  | 'nuv'
  | 'paf_video'
  | 'pam'
  | 'pbm'
  | 'pcx'
  | 'pdv'
  | 'pfm'
  | 'pgm'
  | 'pgmyuv'
  | 'pgx'
  | 'phm'
  | 'photocd'
  | 'pictor'
  | 'pixlet'
  | 'png'
  | 'ppm'
  | 'prores'
  | 'prosumer'
  | 'psd'
  | 'ptx'
  | 'qdraw'
  | 'qoi'
  | 'qpeg'
  | 'qtrle'
  | 'r10k'
  | 'r210'
  | 'rasc'
  | 'rawvideo'
  | 'rl2'
  | 'roqvideo'
  | 'rpza'
  | 'rscc'
  | 'rtv1'
  | 'rv10'
  | 'rv20'
  | 'rv30'
  | 'rv40'
  | 'sanm'
  | 'scpr'
  | 'screenpresso'
  | 'sga'
  | 'sgi'
  | 'sgirle'
  | 'sheervideo'
  | 'simbiosis_imx'
  | 'smackvid'
  | 'smc'
  | 'smvjpeg'
  | 'snow'
  | 'sp5x'
  | 'speedhq'
  | 'srgc'
  | 'sunrast'
  | 'svq1'
  | 'svq3'
  | 'targa'
  | 'targa_y216'
  | 'tdsc'
  | 'eatgq'
  | 'eatgv'
  | 'theora'
  | 'thp'
  | 'tiertexseqvideo'
  | 'tiff'
  | 'tmv'
  | 'eatqi'
  | 'truemotion1'
  | 'truemotion2'
  | 'truemotion2rt'
  | 'camtasia'
  | 'tscc2'
  | 'txd'
  | 'ultimotion'
  | 'utvideo'
  | 'v210'
  | 'v210x'
  | 'v308'
  | 'v408'
  | 'v410'
  | 'vb'
  | 'vble'
  | 'vbn'
  | 'vc1'
  | 'vc1image'
  | 'vcr1'
  | 'xl'
  | 'vmdvideo'
  | 'vmix'
  | 'vmnc'
  | 'vnull'
  | 'vp3'
  | 'vp4'
  | 'vp5'
  | 'vp6'
  | 'vp6a'
  | 'vp6f'
  | 'vp7'
  | 'vp8'
  | 'libvpx'
  | 'vp9'
  | 'libvpx-vp9'
  | 'vqc'
  | 'wbmp'
  | 'wcmv'
  | 'webp'
  | 'wmv1'
  | 'wmv2'
  | 'wmv3'
  | 'wmv3image'
  | 'wnv1'
  | 'wrapped_avframe'
  | 'vqavideo'
  | 'xan_wc3'
  | 'xan_wc4'
  | 'xbin'
  | 'xbm'
  | 'xface'
  | 'xpm'
  | 'xwd'
  | 'y41p'
  | 'ylc'
  | 'yop'
  | 'yuv4'
  | 'zerocodec'
  | 'zlib'
  | 'zmbv'
  | '8svx_exp'
  | '8svx_fib'
  | 'aac'
  | 'aac_fixed'
  | 'aac_at'
  | 'aac_latm'
  | 'ac3'
  | 'ac3_fixed'
  | 'ac3_at'
  | 'acelp.kelvin'
  | 'adpcm_4xm'
  | 'adpcm_adx'
  | 'adpcm_afc'
  | 'adpcm_agm'
  | 'adpcm_aica'
  | 'adpcm_argo'
  | 'adpcm_ct'
  | 'adpcm_dtk'
  | 'adpcm_ea'
  | 'adpcm_ea_maxis_xa'
  | 'adpcm_ea_r1'
  | 'adpcm_ea_r2'
  | 'adpcm_ea_r3'
  | 'adpcm_ea_xas'
  | 'g722'
  | 'g726'
  | 'g726le'
  | 'adpcm_ima_acorn'
  | 'adpcm_ima_alp'
  | 'adpcm_ima_amv'
  | 'adpcm_ima_apc'
  | 'adpcm_ima_apm'
  | 'adpcm_ima_cunning'
  | 'adpcm_ima_dat4'
  | 'adpcm_ima_dk3'
  | 'adpcm_ima_dk4'
  | 'adpcm_ima_ea_eacs'
  | 'adpcm_ima_ea_sead'
  | 'adpcm_ima_iss'
  | 'adpcm_ima_moflex'
  | 'adpcm_ima_mtf'
  | 'adpcm_ima_oki'
  | 'adpcm_ima_qt'
  | 'adpcm_ima_qt_at'
  | 'adpcm_ima_rad'
  | 'adpcm_ima_smjpeg'
  | 'adpcm_ima_ssi'
  | 'adpcm_ima_wav'
  | 'adpcm_ima_ws'
  | 'adpcm_ms'
  | 'adpcm_mtaf'
  | 'adpcm_psx'
  | 'adpcm_sbpro_2'
  | 'adpcm_sbpro_3'
  | 'adpcm_sbpro_4'
  | 'adpcm_swf'
  | 'adpcm_thp'
  | 'adpcm_thp_le'
  | 'adpcm_vima'
  | 'adpcm_xa'
  | 'adpcm_xmd'
  | 'adpcm_yamaha'
  | 'adpcm_zork'
  | 'alac'
  | 'alac_at'
  | 'amrnb'
  | 'amr_nb_at'
  | 'libopencore_amrnb'
  | 'amrwb'
  | 'libopencore_amrwb'
  | 'anull'
  | 'apac'
  | 'ape'
  | 'aptx'
  | 'aptx_hd'
  | 'atrac1'
  | 'atrac3'
  | 'atrac3al'
  | 'atrac3plus'
  | 'atrac3plusal'
  | 'atrac9'
  | 'on2avc'
  | 'binkaudio_dct'
  | 'binkaudio_rdft'
  | 'bmv_audio'
  | 'bonk'
  | 'cbd2_dpcm'
  | 'comfortnoise'
  | 'cook'
  | 'derf_dpcm'
  | 'dfpwm'
  | 'dolby_e'
  | 'dsd_lsbf'
  | 'dsd_lsbf_planar'
  | 'dsd_msbf'
  | 'dsd_msbf_planar'
  | 'dsicinaudio'
  | 'dss_sp'
  | 'dst'
  | 'dca'
  | 'dvaudio'
  | 'eac3'
  | 'eac3_at'
  | 'evrc'
  | 'fastaudio'
  | 'flac'
  | 'ftr'
  | 'g723_1'
  | 'g729'
  | 'gremlin_dpcm'
  | 'gsm'
  | 'gsm_ms'
  | 'gsm_ms_at'
  | 'hca'
  | 'hcom'
  | 'iac'
  | 'ilbc'
  | 'ilbc_at'
  | 'imc'
  | 'interplay_dpcm'
  | 'interplayacm'
  | 'mace3'
  | 'mace6'
  | 'metasound'
  | 'misc4'
  | 'mlp'
  | 'mp1'
  | 'mp1float'
  | 'mp1_at'
  | 'mp2'
  | 'mp2float'
  | 'mp2_at'
  | 'mp3float'
  | 'mp3'
  | 'mp3_at'
  | 'mp3adufloat'
  | 'mp3adu'
  | 'mp3on4float'
  | 'mp3on4'
  | 'als'
  | 'msnsiren'
  | 'mpc7'
  | 'mpc8'
  | 'nellymoser'
  | 'opus'
  | 'libopus'
  | 'osq'
  | 'paf_audio'
  | 'pcm_alaw'
  | 'pcm_alaw_at'
  | 'pcm_bluray'
  | 'pcm_dvd'
  | 'pcm_f16le'
  | 'pcm_f24le'
  | 'pcm_f32be'
  | 'pcm_f32le'
  | 'pcm_f64be'
  | 'pcm_f64le'
  | 'pcm_lxf'
  | 'pcm_mulaw'
  | 'pcm_mulaw_at'
  | 'pcm_s16be'
  | 'pcm_s16be_planar'
  | 'pcm_s16le'
  | 'pcm_s16le_planar'
  | 'pcm_s24be'
  | 'pcm_s24daud'
  | 'pcm_s24le'
  | 'pcm_s24le_planar'
  | 'pcm_s32be'
  | 'pcm_s32le'
  | 'pcm_s32le_planar'
  | 'pcm_s64be'
  | 'pcm_s64le'
  | 'pcm_s8'
  | 'pcm_s8_planar'
  | 'pcm_sga'
  | 'pcm_u16be'
  | 'pcm_u16le'
  | 'pcm_u24be'
  | 'pcm_u24le'
  | 'pcm_u32be'
  | 'pcm_u32le'
  | 'pcm_u8'
  | 'pcm_vidc'
  | 'qcelp'
  | 'qdm2'
  | 'qdm2_at'
  | 'qdmc'
  | 'qdmc_at'
  | 'real_144'
  | 'real_288'
  | 'ralf'
  | 'rka'
  | 'roq_dpcm'
  | 's302m'
  | 'sbc'
  | 'sdx2_dpcm'
  | 'shorten'
  | 'sipr'
  | 'siren'
  | 'smackaud'
  | 'sol_dpcm'
  | 'sonic'
  | 'speex'
  | 'libspeex'
  | 'tak'
  | 'truehd'
  | 'truespeech'
  | 'tta'
  | 'twinvq'
  | 'vmdaudio'
  | 'vorbis'
  | 'libvorbis'
  | 'wady_dpcm'
  | 'wavarc'
  | 'wavesynth'
  | 'wavpack'
  | 'ws_snd1'
  | 'wmalossless'
  | 'wmapro'
  | 'wmav1'
  | 'wmav2'
  | 'wmavoice'
  | 'xan_dpcm'
  | 'xma1'
  | 'xma2'
  | 'libaribb24'
  | 'ssa'
  | 'ass'
  | 'dvbsub'
  | 'dvdsub'
  | 'cc_dec'
  | 'pgssub'
  | 'jacosub'
  | 'microdvd'
  | 'mov_text'
  | 'mpl2'
  | 'pjs'
  | 'realtext'
  | 'sami'
  | 'stl'
  | 'srt'
  | 'subrip'
  | 'subviewer'
  | 'subviewer1'
  | 'text'
  | 'vplayer'
  | 'webvtt'
  | 'xsub'

export type FfmpegDecoderContent = Record<
  FfmpegDecoderContentKey,
  FfmpegDecoderContentValue
>
export type FfmpegEncoderContentValue = {
  label: string
  type: string
  frameLevelMultithreading: boolean
  sliceLevelMultithreading: boolean
  experimental: boolean
  supportsDrawHorizontalBand: boolean
  supportsDirectRenderingMethod1: boolean
}

export type FfmpegEncoderContentKey =
  | 'a64multi'
  | 'a64multi5'
  | 'alias_pix'
  | 'amv'
  | 'apng'
  | 'asv1'
  | 'asv2'
  | 'libaom-av1'
  | 'librav1e'
  | 'libsvtav1'
  | 'avrp'
  | 'avui'
  | 'ayuv'
  | 'bitpacked'
  | 'bmp'
  | 'cfhd'
  | 'cinepak'
  | 'cljr'
  | 'vc2'
  | 'dnxhd'
  | 'dpx'
  | 'dvvideo'
  | 'exr'
  | 'ffv1'
  | 'ffvhuff'
  | 'fits'
  | 'flashsv'
  | 'flashsv2'
  | 'flv'
  | 'gif'
  | 'h261'
  | 'h263'
  | 'h263p'
  | 'libx264'
  | 'libx264rgb'
  | 'h264_videotoolbox'
  | 'hap'
  | 'hdr'
  | 'libx265'
  | 'hevc_videotoolbox'
  | 'huffyuv'
  | 'jpeg2000'
  | 'libopenjpeg'
  | 'jpegls'
  | 'libjxl'
  | 'ljpeg'
  | 'magicyuv'
  | 'mjpeg'
  | 'mpeg1video'
  | 'mpeg2video'
  | 'mpeg4'
  | 'libxvid'
  | 'msmpeg4v2'
  | 'msmpeg4'
  | 'msrle'
  | 'msvideo1'
  | 'pam'
  | 'pbm'
  | 'pcx'
  | 'pfm'
  | 'pgm'
  | 'pgmyuv'
  | 'phm'
  | 'png'
  | 'ppm'
  | 'prores'
  | 'prores_aw'
  | 'prores_ks'
  | 'prores_videotoolbox'
  | 'qoi'
  | 'qtrle'
  | 'r10k'
  | 'r210'
  | 'rawvideo'
  | 'roqvideo'
  | 'rpza'
  | 'rv10'
  | 'rv20'
  | 'sgi'
  | 'smc'
  | 'snow'
  | 'speedhq'
  | 'sunrast'
  | 'svq1'
  | 'targa'
  | 'libtheora'
  | 'tiff'
  | 'utvideo'
  | 'v210'
  | 'v308'
  | 'v408'
  | 'v410'
  | 'vbn'
  | 'vnull'
  | 'libvpx'
  | 'libvpx-vp9'
  | 'wbmp'
  | 'libwebp_anim'
  | 'libwebp'
  | 'wmv1'
  | 'wmv2'
  | 'wrapped_avframe'
  | 'xbm'
  | 'xface'
  | 'xwd'
  | 'y41p'
  | 'yuv4'
  | 'zlib'
  | 'zmbv'
  | 'aac'
  | 'aac_at'
  | 'ac3'
  | 'ac3_fixed'
  | 'adpcm_adx'
  | 'adpcm_argo'
  | 'g722'
  | 'g726'
  | 'g726le'
  | 'adpcm_ima_alp'
  | 'adpcm_ima_amv'
  | 'adpcm_ima_apm'
  | 'adpcm_ima_qt'
  | 'adpcm_ima_ssi'
  | 'adpcm_ima_wav'
  | 'adpcm_ima_ws'
  | 'adpcm_ms'
  | 'adpcm_swf'
  | 'adpcm_yamaha'
  | 'alac'
  | 'alac_at'
  | 'libopencore_amrnb'
  | 'anull'
  | 'aptx'
  | 'aptx_hd'
  | 'comfortnoise'
  | 'dfpwm'
  | 'dca'
  | 'eac3'
  | 'flac'
  | 'g723_1'
  | 'ilbc_at'
  | 'mlp'
  | 'mp2'
  | 'mp2fixed'
  | 'libmp3lame'
  | 'nellymoser'
  | 'opus'
  | 'libopus'
  | 'pcm_alaw'
  | 'pcm_alaw_at'
  | 'pcm_bluray'
  | 'pcm_dvd'
  | 'pcm_f32be'
  | 'pcm_f32le'
  | 'pcm_f64be'
  | 'pcm_f64le'
  | 'pcm_mulaw'
  | 'pcm_mulaw_at'
  | 'pcm_s16be'
  | 'pcm_s16be_planar'
  | 'pcm_s16le'
  | 'pcm_s16le_planar'
  | 'pcm_s24be'
  | 'pcm_s24daud'
  | 'pcm_s24le'
  | 'pcm_s24le_planar'
  | 'pcm_s32be'
  | 'pcm_s32le'
  | 'pcm_s32le_planar'
  | 'pcm_s64be'
  | 'pcm_s64le'
  | 'pcm_s8'
  | 'pcm_s8_planar'
  | 'pcm_u16be'
  | 'pcm_u16le'
  | 'pcm_u24be'
  | 'pcm_u24le'
  | 'pcm_u32be'
  | 'pcm_u32le'
  | 'pcm_u8'
  | 'pcm_vidc'
  | 'real_144'
  | 'roq_dpcm'
  | 's302m'
  | 'sbc'
  | 'sonic'
  | 'sonicls'
  | 'libspeex'
  | 'truehd'
  | 'tta'
  | 'vorbis'
  | 'libvorbis'
  | 'wavpack'
  | 'wmav1'
  | 'wmav2'
  | 'ssa'
  | 'ass'
  | 'dvbsub'
  | 'dvdsub'
  | 'mov_text'
  | 'srt'
  | 'subrip'
  | 'text'
  | 'ttml'
  | 'webvtt'
  | 'xsub'

export type FfmpegEncoderContent = Record<
  FfmpegEncoderContentKey,
  FfmpegEncoderContentValue
>
export type FfmpegFormatContentValue = {
  label: string
  supportsDemuxing: boolean
  supportsMuxing: boolean
}

export type FfmpegFormatContentKey =
  | '3dostr'
  | '3g2'
  | '3gp'
  | '4xm'
  | 'a64'
  | 'aa'
  | 'aac'
  | 'aax'
  | 'ac3'
  | 'ac4'
  | 'ace'
  | 'acm'
  | 'act'
  | 'adf'
  | 'adp'
  | 'ads'
  | 'adts'
  | 'adx'
  | 'aea'
  | 'afc'
  | 'aiff'
  | 'aix'
  | 'alaw'
  | 'alias_pix'
  | 'alp'
  | 'amr'
  | 'amrnb'
  | 'amrwb'
  | 'amv'
  | 'anm'
  | 'apac'
  | 'apc'
  | 'ape'
  | 'apm'
  | 'apng'
  | 'aptx'
  | 'aptx_hd'
  | 'aqtitle'
  | 'argo_asf'
  | 'argo_brp'
  | 'argo_cvg'
  | 'asf'
  | 'asf_o'
  | 'asf_stream'
  | 'ass'
  | 'ast'
  | 'au'
  | 'audiotoolbox'
  | 'av1'
  | 'avfoundation'
  | 'avi'
  | 'avif'
  | 'avm2'
  | 'avr'
  | 'avs'
  | 'avs2'
  | 'avs3'
  | 'bethsoftvid'
  | 'bfi'
  | 'bfstm'
  | 'bin'
  | 'bink'
  | 'binka'
  | 'bit'
  | 'bitpacked'
  | 'bmp_pipe'
  | 'bmv'
  | 'boa'
  | 'bonk'
  | 'brender_pix'
  | 'brstm'
  | 'c93'
  | 'caf'
  | 'cavsvideo'
  | 'cdg'
  | 'cdxl'
  | 'cine'
  | 'codec2'
  | 'codec2raw'
  | 'concat'
  | 'crc'
  | 'cri_pipe'
  | 'dash'
  | 'data'
  | 'daud'
  | 'dcstr'
  | 'dds_pipe'
  | 'derf'
  | 'dfa'
  | 'dfpwm'
  | 'dhav'
  | 'dirac'
  | 'dnxhd'
  | 'dpx_pipe'
  | 'dsf'
  | 'dsicin'
  | 'dss'
  | 'dts'
  | 'dtshd'
  | 'dv'
  | 'dvbsub'
  | 'dvbtxt'
  | 'dvd'
  | 'dxa'
  | 'ea'
  | 'ea_cdata'
  | 'eac3'
  | 'epaf'
  | 'evc'
  | 'exr_pipe'
  | 'f32be'
  | 'f32le'
  | 'f4v'
  | 'f64be'
  | 'f64le'
  | 'ffmetadata'
  | 'fifo'
  | 'fifo_test'
  | 'film_cpk'
  | 'filmstrip'
  | 'fits'
  | 'flac'
  | 'flic'
  | 'flv'
  | 'framecrc'
  | 'framehash'
  | 'framemd5'
  | 'frm'
  | 'fsb'
  | 'fwse'
  | 'g722'
  | 'g723_1'
  | 'g726'
  | 'g726le'
  | 'g729'
  | 'gdv'
  | 'gem_pipe'
  | 'genh'
  | 'gif'
  | 'gif_pipe'
  | 'gsm'
  | 'gxf'
  | 'h261'
  | 'h263'
  | 'h264'
  | 'hash'
  | 'hca'
  | 'hcom'
  | 'hdr_pipe'
  | 'hds'
  | 'hevc'
  | 'hls'
  | 'hnm'
  | 'ico'
  | 'idcin'
  | 'idf'
  | 'iff'
  | 'ifv'
  | 'ilbc'
  | 'image2'
  | 'image2pipe'
  | 'imf'
  | 'ingenient'
  | 'ipmovie'
  | 'ipod'
  | 'ipu'
  | 'ircam'
  | 'ismv'
  | 'iss'
  | 'iv8'
  | 'ivf'
  | 'ivr'
  | 'j2k_pipe'
  | 'jacosub'
  | 'jpeg_pipe'
  | 'jpegls_pipe'
  | 'jpegxl_anim'
  | 'jpegxl_pipe'
  | 'jv'
  | 'kux'
  | 'kvag'
  | 'laf'
  | 'latm'
  | 'lavfi'
  | 'live_flv'
  | 'lmlm4'
  | 'loas'
  | 'lrc'
  | 'luodat'
  | 'lvf'
  | 'lxf'
  | 'm4v'
  | 'matroska'
  | 'matroska-webm'
  | 'mca'
  | 'mcc'
  | 'md5'
  | 'mgsts'
  | 'microdvd'
  | 'mjpeg'
  | 'mjpeg_2000'
  | 'mkvtimestamp_v2'
  | 'mlp'
  | 'mlv'
  | 'mm'
  | 'mmf'
  | 'mods'
  | 'moflex'
  | 'mov'
  | 'mp2'
  | 'mp3'
  | 'mp4'
  | 'mpc'
  | 'mpc8'
  | 'mpeg'
  | 'mpeg1video'
  | 'mpeg2video'
  | 'mpegts'
  | 'mpegtsraw'
  | 'mpegvideo'
  | 'mpjpeg'
  | 'mpl2'
  | 'mpsub'
  | 'msf'
  | 'msnwctcp'
  | 'msp'
  | 'mtaf'
  | 'mtv'
  | 'mulaw'
  | 'musx'
  | 'mv'
  | 'mvi'
  | 'mxf'
  | 'mxf_d10'
  | 'mxf_opatom'
  | 'mxg'
  | 'nc'
  | 'nistsphere'
  | 'nsp'
  | 'nsv'
  | 'null'
  | 'nut'
  | 'nuv'
  | 'obu'
  | 'oga'
  | 'ogg'
  | 'ogv'
  | 'oma'
  | 'opus'
  | 'osq'
  | 'paf'
  | 'pam_pipe'
  | 'pbm_pipe'
  | 'pcx_pipe'
  | 'pdv'
  | 'pfm_pipe'
  | 'pgm_pipe'
  | 'pgmyuv_pipe'
  | 'pgx_pipe'
  | 'phm_pipe'
  | 'photocd_pipe'
  | 'pictor_pipe'
  | 'pjs'
  | 'pmp'
  | 'png_pipe'
  | 'pp_bnk'
  | 'ppm_pipe'
  | 'psd_pipe'
  | 'psp'
  | 'psxstr'
  | 'pva'
  | 'pvf'
  | 'qcp'
  | 'qdraw_pipe'
  | 'qoi_pipe'
  | 'r3d'
  | 'rawvideo'
  | 'realtext'
  | 'redspark'
  | 'rka'
  | 'rl2'
  | 'rm'
  | 'roq'
  | 'rpl'
  | 'rsd'
  | 'rso'
  | 'rtp'
  | 'rtp_mpegts'
  | 'rtsp'
  | 's16be'
  | 's16le'
  | 's24be'
  | 's24le'
  | 's32be'
  | 's32le'
  | 's337m'
  | 's8'
  | 'sami'
  | 'sap'
  | 'sbc'
  | 'sbg'
  | 'scc'
  | 'scd'
  | 'sdl2'
  | 'sdns'
  | 'sdp'
  | 'sdr2'
  | 'sds'
  | 'sdx'
  | 'segment'
  | 'ser'
  | 'sga'
  | 'sgi_pipe'
  | 'shn'
  | 'siff'
  | 'simbiosis_imx'
  | 'sln'
  | 'smjpeg'
  | 'smk'
  | 'smoothstreaming'
  | 'smush'
  | 'sol'
  | 'sox'
  | 'spdif'
  | 'spx'
  | 'srt'
  | 'stl'
  | 'stream_segment'
  | 'streamhash'
  | 'subviewer'
  | 'subviewer1'
  | 'sunrast_pipe'
  | 'sup'
  | 'svag'
  | 'svcd'
  | 'svg_pipe'
  | 'svs'
  | 'swf'
  | 'tak'
  | 'tedcaptions'
  | 'tee'
  | 'thp'
  | 'tiertexseq'
  | 'tiff_pipe'
  | 'tmv'
  | 'truehd'
  | 'tta'
  | 'ttml'
  | 'tty'
  | 'txd'
  | 'ty'
  | 'u16be'
  | 'u16le'
  | 'u24be'
  | 'u24le'
  | 'u32be'
  | 'u32le'
  | 'u8'
  | 'uncodedframecrc'
  | 'usm'
  | 'v210'
  | 'v210x'
  | 'vag'
  | 'vbn_pipe'
  | 'vc1'
  | 'vc1test'
  | 'vcd'
  | 'vidc'
  | 'vividas'
  | 'vivo'
  | 'vmd'
  | 'vob'
  | 'vobsub'
  | 'voc'
  | 'vpk'
  | 'vplayer'
  | 'vqf'
  | 'vvc'
  | 'w64'
  | 'wady'
  | 'wav'
  | 'wavarc'
  | 'wc3movie'
  | 'webm'
  | 'webm_chunk'
  | 'webm_dash_manifest'
  | 'webp'
  | 'webp_pipe'
  | 'webvtt'
  | 'wsaud'
  | 'wsd'
  | 'wsvqa'
  | 'wtv'
  | 'wv'
  | 'wve'
  | 'x11grab'
  | 'xa'
  | 'xbin'
  | 'xbm_pipe'
  | 'xmd'
  | 'xmv'
  | 'xpm_pipe'
  | 'xvag'
  | 'xwd_pipe'
  | 'xwma'
  | 'yop'
  | 'yuv4mpegpipe'

export type FfmpegFormatContent = Record<
  FfmpegFormatContentKey,
  FfmpegFormatContentValue
>
export type FfmpegStrictOptionContentValue = {
  note: string
}

export type FfmpegStrictOptionContent = Record<
  FfmpegStrictOption,
  FfmpegStrictOptionContentValue
>
