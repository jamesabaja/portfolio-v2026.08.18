export function Footer() {
  return (
    <footer className="mt-auto flex w-full flex-col items-start justify-between gap-2 border-t border-sand px-6 py-6 sm:flex-row sm:items-center sm:gap-6 sm:px-10 lg:px-20">
      <p className="text-xs leading-4 text-espresso">
        &copy; {new Date().getFullYear()} James Gabriel Abaja
      </p>

      <p data-reveal="fade" className="text-xs leading-4 italic text-espresso">
        Designed with intention, built with care, and powered by matcha.
      </p>
    </footer>
  );
}
