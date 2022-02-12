import useI18n from "../modules/i18n/useI18n"

function FeatView({ feat }) {
	const { tr } = useI18n()

	return (
    <div className="p-4">
      <div className="text-meta">
        {feat.forClass && (
          <span>
            <div>Pour la classe {feat.class.name}</div>
            <div>At level {feat.level}</div>
          </span>
        )}
      </div>

			<div className="prose mt-4">{tr(feat.resume)}</div>
			<div className="prose mt-4">{tr(feat.desc)}</div>
    </div>
  );
}

export default FeatView