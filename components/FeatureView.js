import useI18n from "../modules/i18n/useI18n"

// TODO: open class / open background
function FeatureView({ feature }) {
	const { tr } = useI18n()

	return (
    <div className="p-4">
      <div className="text-meta">
        {feature.forBackground && <span>Pour le background {feature.background.name}</span>}
        {feature.forClass && (
          <span>
            <div>Pour la classe {feature.class.name}</div>
            <div>At level {feature.level}</div>
          </span>
        )}
      </div>

			<div className="prose mt-4">{tr(feature.desc)}</div>
    </div>
  );
}

export default FeatureView