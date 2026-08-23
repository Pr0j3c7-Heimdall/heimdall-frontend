/** C2PA API 응답을 결과 UI용 객체로 변환 */
export function mapC2paToUI(rawC2pa) {
  if (!rawC2pa || rawC2pa.c2pa_id == null) return undefined;

  return {
    isCompliant: rawC2pa.is_c2pa_compliant ?? false,
    details: {
      ...(rawC2pa.created_model != null && rawC2pa.created_model !== '' && { '모델명 1': rawC2pa.created_model }),
      ...(rawC2pa.converted_model != null && rawC2pa.converted_model !== '' && { '모델명 2': rawC2pa.converted_model }),
      ...(rawC2pa.created_description != null &&
        rawC2pa.created_description !== '' && { '모델명 3': rawC2pa.created_description }),
      ...(rawC2pa.claim_generator != null && rawC2pa.claim_generator !== '' && { '플랫폼 1': rawC2pa.claim_generator }),
      ...(rawC2pa.claim_generator_info_name != null &&
        rawC2pa.claim_generator_info_name !== '' && { '플랫폼 2': rawC2pa.claim_generator_info_name }),
      ...(rawC2pa.synth_id != null && rawC2pa.synth_id !== '' && { SynthID: rawC2pa.synth_id }),
      ...(rawC2pa.visible_watermark != null &&
        rawC2pa.visible_watermark !== '' && { 워터마크: rawC2pa.visible_watermark }),
      ...(rawC2pa.total_digital_source_type != null &&
        rawC2pa.total_digital_source_type !== '' && { '디지털 소스': rawC2pa.total_digital_source_type }),
      ...(rawC2pa.synth_id_digital_source_type != null &&
        rawC2pa.synth_id_digital_source_type !== '' && {
          'SynthID 디지털 소스': rawC2pa.synth_id_digital_source_type
        }),
      ...(rawC2pa.visible_watermark_digital_source_type != null &&
        rawC2pa.visible_watermark_digital_source_type !== '' && {
          '워터마크 디지털 소스': rawC2pa.visible_watermark_digital_source_type
        })
    }
  };
}
