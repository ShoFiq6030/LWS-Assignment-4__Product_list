import { useEffect, useState } from "react";

const useFakeStore = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;


        const fetchProductsData = async () => {
            try {
                setLoading(true);
                setError(null);

                await new Promise((resolve) => setTimeout(resolve, 500));

                const response = await fetch(url);
                if (!response.ok) {
                    const errorMgs = `Fetching products failed: ${response.status}`;
                    throw new Error(errorMgs);
                }
                const fetchData = await response.json();
                if (isMounted) setData(fetchData);


            } catch (err) {
                if (isMounted) setError(err);
            } finally {
                if (isMounted) setLoading(false);

            }
        };
        fetchProductsData();

        // Cleanup function 
        return () => {
            isMounted = false;
        };
    }, [url]);

    return { data, loading, error };
};

export default useFakeStore;
