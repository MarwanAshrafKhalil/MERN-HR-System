function Navbar() {
  return (
    <div className="flex flex-row mx-auto items-center rounded-b-lg justify-center bg-slate-700">
      <div className="flex px-3 py-4">
        <ul className="flex gap-16 text-white text-lg font-semibold">
          <li>Profile</li>
          <li>Leaves</li>
          <li>Punch</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
