function Navbar() {
  return (
    <div className="flex flex-row mx-auto items-center  justify-center bg-slate-700">
      <div className="flex px-3 py-4">
        <ul className="flex gap-16 text-white text-md sm:text-lg font-semibold">
          <li>Profile</li>
          <li>Leaves</li>
          <li>Punch</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
