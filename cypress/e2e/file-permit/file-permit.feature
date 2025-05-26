Feature: DormMate File Permit

  As a logged-in dormer  
  I want to file a permit  
  So that my permission request is submitted

  Background:
    Given the DormMate app is running
    And I am logged in as a dormer with email "testuser@up.edu.ph" and password "testpassword"
    And I am on the file permit page

  Scenario Outline: Submit a permit request
    When I open the File Permit modal
    And I select permit type "<permitType>"
    And I enter time out "<timeOut>"
    And I enter destination "<destination>"
    And I enter emergency contact "<emergencyContact>"
    And I enter return date "<returnDate>"
    And I enter purpose "<purpose>"
    And I submit the permit

    Examples:
      | permitType      | timeOut | destination   | emergencyContact | returnDate  | purpose         |
      | Late Permit     | 18:00   | Main Gate     | 09123456789      | 2025-05-26  | Visiting friend |
