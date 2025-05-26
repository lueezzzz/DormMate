Feature: DormMate Logout

  As a logged-in user of DormMate  
  I want to log out  

  Background:
    Given the DormMate app is running
    And I am logged in as a dormer with email "testuser@up.edu.ph" and password "testpassword"

  Scenario: User confirms logout via modal
    When I click the logout button
    Then I should see a logout confirmation modal
    When I confirm the logout
    Then I should be redirected to "/"