//
// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/css/labels
//
import clsx from 'clsx'

function Tag({ label, children, color, rounded = false }) {
  return (
    <span
      className={clsx(
        `text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1`,
        `text-${color}-600 bg-${color}-200`,
        {
          "rounded-full": rounded,
        }
      )}
    >
      {children || label}
    </span>
  );
}

export default Tag;
