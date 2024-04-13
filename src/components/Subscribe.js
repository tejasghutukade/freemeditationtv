
import { useEffect } from "react";

const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default function Subscribe() {
  return (
    <>
      <div>{useScript("https://apis.google.com/js/platform.js")}</div>
      <div
        className="g-ytsubscribe"
        data-channelid="UC1s6Xs4OboEjVN5gPz2ldwQ"
        data-layout="full"
        data-theme="dark"
        data-count="hidden"
      ></div>
    </>
  );
}
