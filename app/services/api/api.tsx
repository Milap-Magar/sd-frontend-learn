const BASE_URL = import.meta.env.VITE_URL;

export async function api(route: string) {
    const response = await fetch(`${BASE_URL}/${route}`);
    // check weather datasets are there or not
    if(!response.ok) throw new Error("Request Error");
    // return data
    const data = await response.json(); 
    return data; 
}