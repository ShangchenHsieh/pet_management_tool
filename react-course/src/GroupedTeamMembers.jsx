import { useState } from "react"
const GroupedTeamMembers = (employees, selectedTeam, setTeam) => {
    const [groupedEmployees, setGroupedData] = useState(groupTeamMembers())

    function groupTeamMembers() {
        var teams = [];

        var teamAMembers = employees.filter((employee) => employee.teamName === 'TeamA');
        var teamA = { team: 'TeamA', members: teamAMembers, collapsed: selectedTeam === 'TeamA' ? false : true };
        teams.push(teamA);
    
        var teamBMembers = employees.filter((employee) => employee.teamName === 'TeamB');
        var teamB = { team: 'TeamB', members: teamBMembers, collapsed: selectedTeam === 'TeamB' ? false : true };
        teams.push(teamB);
    
        var teamCMembers = employees.filter((employee) => employee.teamName === 'TeamC');
        var teamC = { team: 'TeamC', members: teamCMembers, collapsed: selectedTeam === 'TeamC' ? false : true };
        teams.push(teamC);
    
        var teamDMembers = employees.filter((employee) => employee.teamName === 'TeamD');
        var teamD = { team: 'TeamD', members: teamDMembers, collapsed: selectedTeam === 'TeamD' ? false : true };
        teams.push(teamD);
    
        return teams;
    }


    return(
        <main className="container">
            {
                groupedEmployees.map((item) => {
                    
                })
            }
        </main>
    )
}

export default GroupedTeamMembers