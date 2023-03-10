import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPeding, setIsPeding] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    console.log("use effect ran");
    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            throw Error("Could not fetch any data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPeding(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch Aborted");
          } else {
            setIsPeding(false);
            setError(err.message);
          }
        });
    }, 0);

    return () => abortCont.abort();
  }, []);

  return { data, isPeding, error };
};

export default useFetch;
