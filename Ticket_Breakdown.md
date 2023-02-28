# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1. Implement function `saveCustomAgentId`. This function will receive an internal agent id and a new custom agent id that will allow customers to set their own custom agent id. Property `customeAgentId` will be saved as part of the `Agent` model and will be resurfaced alongside internal agent id property. In case of no custom agent id set the `customAgentId` will be set to null. Create unit tests for validation (test for creating and value return). Estimate 2 hours for implementation & testing.

```ts
class AgentModel {
	private agentId: string;
	// + private customAgentId: string;
}

function saveCustomAgentId(agentId: string, customId: string): AgentModel {
	// check validity of customId via some validation logic
	// find agent Model via agentID
	// set customAgentId to customId
	// return updated agent model
}
```

2. Update function `getShiftByFacility`. This function should surface agent metadata such as internal agent id and `customAgentId` property which will be set set to custom value (via `saveCustomId` function) or null. With filter options provided, filter out shifts based on `customAgentId` paramter which is custom agent id. Create unit tests for validation (test for value return for both null and custom values set). Estimate 2 hours for implementation & testing.

```ts
interface IFilterOptions {
	customAgentId?: string 
}
function getShiftByFacility(facilityId: string, options: IFilterOptions): Shifts[] {
	// define default options
	// find matching shifts
	// populate agent metadata based on facilities
	//    include customAgentId as part of return value for agent metadata
	//    if customAgentId is provided, filter out non-matching entries
	// return list of shifts
}
```

3. Create function `generateReportViaAgentId`. This function will take facilities id and custom agent id.

```ts
function generateReportViaAgentId(facilityId: string, customAgentId: string): Shifts[] {
	const lists = getShiftByFacility(facilityId, { customAgentId });
	return generateReport(lists);
}
```
