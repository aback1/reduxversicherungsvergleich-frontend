import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const baseURL = "http://127.0.0.1:8000/api/";

const fetchSales = async () => {
    const response = await fetch(`${baseURL}sales`);
    if (!response.ok) throw new Error("Something went wrong");
    const data = await response.json();
    return data;
};

const postSale = async (newSale) => {
    const response = await fetch(`${baseURL}sales`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newSale),
    });

    if(!response.ok) {
        console.error(
            "Network response was not ok",
            response.status,
            response.statusText
        );
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Posting new Sale", data);
    return data;

};

export const useGetInsurances = () => {
    return useQuery({
        queryKey: ["sales"],
        queryFn: fetchSales,
    });
};

export const usePostSale = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postSale,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["sales"]})
        },
        onError: (error) => {
            console.error("Error creating user", error);
        },
    });
};


