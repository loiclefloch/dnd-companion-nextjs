import { makeI18n } from "../modules/i18n/useI18n"

const useI18n = makeI18n({ 
  'forClass': {
    fr: 'Pour la classe %{class.name}',
    en: 'For class %{class.name}',
  },
  'forLevel': {
    fr: 'Pour le niveau %{level}',
    en: 'For level %{level}',
  },
})

function FeatView({ feat }) {
	const { tr } = useI18n()

	return (
    <div className="p-4">
      <div className="text-meta">
        {feat.forClass && (
          <span>
            <div>{tr('forClass', { 'class.name': feat.class.name })}</div>
            <div>{tr('forLevel', { 'level': feat.level })}</div>
          </span>
        )}
      </div>

			<div className="prose mt-4">{tr(feat.resume)}</div>
			<div className="prose mt-4">{tr(feat.desc)}</div>
    </div>
  );
}

export default FeatView