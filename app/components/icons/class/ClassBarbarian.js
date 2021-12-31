import clsx from "clsx"

const ClassBarbarian = ({ 
  className,
  withBgColor,
  withTextColor,
  ...props 
}) => (
  <svg
    width={49.96}
    height={94.767}
    viewBox="0 0 13.219 25.074"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx(className,{
      "bg-red-400": withBgColor,
			"fill-red-400": withTextColor,
    })}
    {...props}
  >
    <path
      className="fil0"
      d="M3.4-.028c-.232.27-.4.396-.605.652-.21.26-.4.56-.57.806-.496.722-.902.812-.3 1.649l.269.335c-.51.335-.442-.147-1.234.458.038.82-.956 2.658.21 5.884.329-.057.452-.23.823-.34.08-.097-.132-.117.271-.185.062.552-.002.22-.15.339-.094.123-.39.611-.456.763-.17.39.046.631.212.932.333.604.73 1.1 1.172 1.522l.425.552c.094-.124.037.015.056-.165.003-.805-.132-1.428.147-2.21.131-.368.172-.494.394-.802.243-.337.271-.566.642-.627.093-.218.645-.132.908-.154l.225-.262c1.221 1.704.82 1.955.842 4.219.007.783.096.935-.422 1.29.336.788.261.259.259 1.558-.001.638.07 1.339-.048 1.953.293.466.128 2.406.126 3.101-.004.932.121 2.518-.042 3.354.02.009.05.004.057.032.032.115.036.02.108.076.578.453.908.145 1.272-.227-.16-1.704-.035-5.431-.026-7.462.004-.905-.13-1.679.265-2.297l-.32-.396c-.238-.397-.17-3.753-.137-3.832.069-.157.163-.03.459-.656.185-.393.186-.513.403-.678.515.1.13.142.54.202.2.03.328-.035.607.066.156.057.134.073.214.122.223.258.399.49.546.805.674.667.47 2.126.444 2.922l.284-.276.008.02.551-.784.038-.051.25-.263c.018-.014.05-.033.074-.05l.367-.528c-.002-.18-.054-.146.103-.146.155-.37.39-.641.54-.986.159-.364.179-.901.306-1.191.038-.248-.016-.399.2-.543.026-.495.118-.963.112-1.568l-.423-.097-.558-.054c-.24-.124-.13.016-.219-.253l.449-.071.277-.082.44-.141-.022-.978c-.111-.192-.008.223-.136-.297-.039-.156-.026-.259-.039-.408-.29-1.578-.818-2.626-1.806-3.722-.787-.873-.564-.918-.94-.946.253.516.093 1.868-.125 2.368-.102.545-.37.693-.643.9-.254.191-.623.344-1.035.43l-.22.037c-.098.352-.05.425-.314.617l-.137-.239-.101-.126c-.3-.608.335.19-.464-.811-.512-.643.026-.733-.694-.85-.135.22-.107.319-.24.583-.122.24-.184.224-.326.408-.11.144-.168.325-.206.515-.092.458-.046.348-.262.512l-.282-.07-.017-.167c-.263-.37.052-.305-.386-.423-1.352-.366-.874-.508-1.541-.771l-.02-.297c-.215-.932-.337-1.226-.273-2.331l-.057-.287c.018.154.053.117-.1.117z"
      style={{
        clipRule: "evenodd",
        fill: "currentColor",
        fillRule: "evenodd",
        strokeWidth: 0.254,
        imageRendering: "optimizeQuality",
        shapeRendering: "geometricPrecision",
        textRendering: "geometricPrecision",
      }}
      transform="translate(-.6 .146)"
    />
  </svg>
)

export default ClassBarbarian
