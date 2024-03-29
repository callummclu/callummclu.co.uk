import { Post } from "../types/post";

export async function getAllPosts(page = 1) {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/post?itemPerPage=5&page=${page}`,
    {
      method: "GET",
    }
  );
  return response;
}

export async function getAllOrganisations(page = 1) {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/post/organisations?itemPerPage=5&page=${page}`,
    {
      method: "GET",
    }
  );
  return response;
}

export async function getAllSpotlights() {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/post/spotlight`,
    {
      method: "GET",
    }
  );
  return response;
}

export async function getSinglePost(id: string | number) {
  const response = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/post/${id}`, {
    method: "GET",
  });
  return response;
}

export async function getSinglePostByTitle(title: string) {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/post/title/${title}`,
    {
      method: "GET",
    }
  );
  return response;
}

export async function getOrganisationDependencies(ids: number[]) {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/post/organisation?ids=${ids.join(
      ","
    )}`,
    {
      method: "GET",
    }
  );
  return response;
}

export async function createPost(post: Post) {
  const response = fetch(`${process.env.REACT_APP_BACKEND_URI}/post`, {
    method: "POST",
    body: JSON.stringify(post),
  });
  return response;
}
