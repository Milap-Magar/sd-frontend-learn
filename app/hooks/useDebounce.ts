import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number){
    const [debouncedValue, setDebouncedValue] = useState<string>("");

    // having this as debounced values - as hitting api's after certain time delay.
    useEffect(() => {
            const timeoutId = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return (()=> clearTimeout(timeoutId));
    },[value, delay])
    return debouncedValue;
}
