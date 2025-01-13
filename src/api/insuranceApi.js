import { useQuery } from "@tanstack/react-query";

const baseURL = "http://127.0.0.1:8000/api/";

const fetchInsurances = async () => {
  const response = await fetch(`${baseURL}versicherungen`);
  if (!response.ok) throw new Error("Something went wrong");
  const data = await response.json();
  return data;
};

export const useGetInsurances = () => {
  return useQuery({
    queryKey: ["insurance"],
    queryFn: fetchInsurances,
  });
};
