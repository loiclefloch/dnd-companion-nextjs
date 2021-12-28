//
// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/css/labels
//
import clsx from 'clsx'

function Tag({ label, children, rounded = false, className }) {
  return (
    <span
      className={clsx(
        `text-xs font-semibold inline-block py-1 px-2 uppercase rounded last:mr-0`,
        {
          "rounded-full": rounded,
        },
        className
      )}
    >
      {children || label}
    </span>
  );
}

export default Tag;
