import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const baseURL = "http://127.0.0.1:8000/api/";

const fetchUsers = async () => {
  const response = await fetch(`${baseURL}users`);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data;
};

const registerUser = async (newUser) => {
  const response = await fetch(`${baseURL}users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if(!response.ok){
    console.error(
        "Network response was not ok",
        response.status,
        response.statusText,
    );
    throw new Error("Network response was not ok");
  }


  const data = await response.json();
  console.log("Registration response:", data);
  return data;
};


export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,

    onError: (error) => {
      console.error("Error fetching users", error);
    },
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]})
    },
    onError: (error) => {
      console.error("Error creating user", error);
    },
  });
};


