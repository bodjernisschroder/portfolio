## Gotorz - Exam Project Team 7 (DMOoF24)

**Gotorz** is a full-stack travel booking system developed as our 3rd semester exam project.  
It allows users to search and book complete travel packages—including flights and hotels—through an interactive Blazor Server web application.

The system is built using a multi-project architecture:
- A Blazor frontend for the user interface
- Two backend APIs: one for user authentication and one for travel data (flights/hotels)
- The TravelBridgeAPI is designed to run locally but is also hosted externally for convenience during development. It communicates with the frontend via RESTful HTTP

The solution is designed to simulate a real-world, modular web application, emphasizing clean separation of concerns, API integration, and modern .NET development practices.

![.NET](https://img.shields.io/badge/.NET-8.0-blueviolet)
![Blazor](https://img.shields.io/badge/Blazor-Server-green)
![Entity Framework](https://img.shields.io/badge/Entity_Framework-Core-blue)
![SQLite](https://img.shields.io/badge/SQLite-DB-lightgrey)
![Project Type](https://img.shields.io/badge/Project-Exam--Final-orange)

---

## Technologies Used

- **.NET 8** (C#)
- **Blazor Server**
- **ASP.NET Core Web API**
- **Entity Framework Core**
- **SQLite** (for the TravelBridgeAPI & AuthAndUserAPI databases)
- **REST APIs**
- **HTTPClient** (for API communication)

---

## Team Members

| Name        | Responsibilities                                                                 |
|:------------|:----------------------------------------------------------------------------------|
| **Bo**      | Blazor Web Application (Gotorz), integrated frontend with TravelBridgeAPI        |
| **Burak**   | Blazor Web Application (Gotorz), developed AuthAndUserAPI (authentication logic) |
| **Peter**   | Developed TravelBridgeAPI, handled Docker configuration                          |
| **Kenneth** | Developed TravelBridgeAPI, implemented logging functionality                     |

---

## Project Structure

| Path/Project           | Description                                             |
|:------------------------|:--------------------------------------------------------|
| `FullGotorz/`          | Root directory for the entire solution                 |
| `AuthAndUserAPI/`      | User authentication API                                |
| `Gotorz/`              | Blazor Server application (frontend)                   |
| `Gotorz.Client/`       | Minimal project for separation (not in active use)     |
| `TravelBridgeAPI/`     | API for flights and hotels (hosted externally)         |
| `Gotorz.sln`           | Full Visual Studio solution file                       |
| `.gitignore`           | Git ignore rules                                       |

Each project is a standalone application but is designed to work together as part of the Gotorz system.

---

## Running the Project

1. Clone the repository.
2. Open `Gotorz.sln` in Visual Studio.
3. Set up Visual Studio to start **all four projects** simultaneously:
   - `Gotorz` (Blazor Server frontend)
   - `AuthAndUserAPI` (Authentication API)
   - `TravelBridgeAPI` (Flights & Hotels API)
   - `Gotorz.Client` (Included for structure—runs but minimal)
4. Run the solution.

**Note:**  
To run multiple startup projects in Visual Studio:
- Right-click the **solution** in Solution Explorer and choose **"Set Startup Projects..."**  
- In the dialog, select **"Multiple startup projects"**  
- Set **Action** to `Start` for all four projects  
- Click **OK**, then run the solution

This ensures the frontend and both APIs are available and communicating as intended.

The `TravelBridgeAPI`,  `Gotorz` and `AuthAndUserAPI` projects all require a valid `appsettings.Development.json` file with API and database configuration.  
If it's missing or excluded from source control, please reach out to the team and we’ll provide it upon request.
 
---

```
                                                   __  __
  ▄▄█▀▀▀█▄█           ██                           \ `/ |
▄██▀     ▀█           ██                            \__`!
██▀       ▀  ▄██▀██▄██████  ▄██▀██▄▀███▄███ █▀▀▀███ / ,' `-.__________________
██          ██▀   ▀██ ██   ██▀   ▀██ ██▀ ▀▀ ▀  ███ '-'\\_____                  `-.
██▄    ▀██████     ██ ██   ██     ██ ██       ███     <____()-=O=O=O=O=O=[]====--)
▀██▄     ██ ██▄   ▄██ ██   ██▄   ▄██ ██      ███  ▄     `.___ ,-----,_______...-'
  ▀▀███████  ▀█████▀  ▀████ ▀█████▀▄████▄   ███████          /    .'
                                                            /   .'
                                                           /  .'
                                                           `-'
```