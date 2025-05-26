Feature: DormMate Login and Role-Based Routing

  Scenario Outline: User is redirected to the correct dashboard
    Given the DormMate app is running
    And I am on the login page
    When I login with email "<email>" and password "<password>"
    Then I should be redirected to "<expectedRoute>"

  Examples:
    | email              | password     | expectedRoute  |
    | testuser@up.edu.ph | testpassword | /manage        |
    | testuser@up.edu.ph | testpassword | /file-permit   |