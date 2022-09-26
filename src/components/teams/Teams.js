import { useSelector } from "react-redux";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";
import Error from "../ui/Error";
import Team from "./Team";

const Teams = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = user || {};
  const { data: teams, isLoading, isError } = useGetTeamsQuery(myEmail) || {};

  let content = null;

  if (isLoading) {
    content = <h3 className="text-center">Loading...</h3>;
  } else if (!isLoading && isError) {
    content = (
      <h3 className="text-center">
        <Error message="There is an Error" />
      </h3>
    );
  } else if (!isLoading && !isError && teams?.length === 0) {
    content = <h3 className="text-center">No Team found!</h3>;
  } else if (!isLoading && !isError && teams?.length > 0) {

    content = teams?.map((team) => <Team team={team} key={team.id} />);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
      {content}
    </div>
  );
};

export default Teams;
