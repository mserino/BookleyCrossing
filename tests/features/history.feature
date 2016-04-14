Feature: History

	As a user
	I want to see my borrowing history
	So I know all the books I borrowed

	@watch
	Scenario: Viewing history
		Given I am logged in
		And I have borrowed a book
		When I return a book
		And I view "My profile" page
		Then I see a list of the books I borrowed