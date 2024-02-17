import ApplicantForm from "./components/ApplicantForm";

const Home = () => {
  return (
    <>
      <nav class="flex items-center justify-between flex-wrap bg-sky-900 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <span class="font-semibold text-xl tracking-tight">
            Applicant Management
          </span>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <ApplicantForm />
      </div>
    </>
  );
};

export default Home;
