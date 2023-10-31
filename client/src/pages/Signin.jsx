function Signin() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  gap-4  items-center justify-center rounded-lg  my-4 py-4 bg-slate-600 "
        type="submit"
      >
        <h1 className="text-white font-semibold text-2xl uppercase">
          Sign In{" "}
        </h1>

        <input
          className=" rounded-md p-2 "
          type="text"
          placeholder="Username"
        />
        <input
          className=" rounded-md p-2"
          type="password"
          placeholder="Password"
        />
        <button className="my-2 w-24 h-12  rounded-md bg-slate-900 text-white hover:bg-opacity-70">
          Login
        </button>
      </form>
    </div>
  );
}

export default Signin;
