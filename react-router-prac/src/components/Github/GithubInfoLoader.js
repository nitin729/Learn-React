export default async function githubInfoLoader() {
  const response = await fetch(`https://api.github.com/users/nitin729`);
  return response.json();
}
