//
// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/css/labels
//
import clsx from 'clsx'

function Tag({ label, children, rounded = false, className, small = false }) {
  return (
    <span
      className={clsx(
        `text-xs font-semibold inline-block uppercase rounded last:mr-0`,
        {
          "rounded-full": rounded,
          "py-1 px-2": !small,
          "py-0.5 px-2": small,
        },
        className
      )}
    >
      {children || label}
    </span>
  );
}

export default Tag;
