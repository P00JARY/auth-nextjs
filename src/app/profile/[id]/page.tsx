export default function userProfile({ params }: any) {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <p className="text-4xl">Profile page </p>
      <span className="text-5xl">{params.id}</span>
    </div>
  );
}
