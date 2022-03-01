import { makeI18n } from "../modules/i18n/useI18n"

const useI18n = makeI18n({
  'forBackground': {
    fr: 'Pour le background %{background.name}',
    en: 'For background %{background.name}',
  },
  'forClass': {
    fr: 'Pour la classe %{class.name}',
    en: 'For class %{class.name}',
  },
  'forLevel': {
    fr: 'Pour le niveau %{level}',
    en: 'For level %{level}',
  },
})

// TODO: open class / open background
function FeatureView({ feature }) {
	const { tr } = useI18n()

	return (
    <div className="p-4">
      <div className="text-meta">
        {feature.forBackground && <span>{tr('forBackground', { 'background.name': feature.background.name })}</span>}
        {feature.forClass && (
          <span>
            <div>{tr('forClass', { 'class.name': feature.class.name })}</div>
            <div>{tr('forLevel', { 'level': feature.level })}</div>
          </span>
        )}
      </div>

			<div className="prose mt-4">{tr(feature.desc)}</div>
    </div>
  );
}

export default FeatureView