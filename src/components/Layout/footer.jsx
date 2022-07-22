export default function Footer() {
  return (
    <footer className="hidden sm:fixed bottom-0 w-full bg-slate-50 p-5 text-center">
      <p>0.1.1</p>
      <>
        Made by{" "}
        <a
          className="underline text-primary"
          href="https://github.com/MolletSimon"
        >
          Simon Mollet
        </a>{" "}
        with ❤️
      </>
    </footer>
  );
}
