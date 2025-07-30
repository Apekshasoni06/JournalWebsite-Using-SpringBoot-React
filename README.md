# 📖 JournalApp - Personal Writing Space

A full-stack personal journaling application built with **Spring Boot** (backend) and **React** (frontend). Capture your thoughts, memories, and daily experiences in a beautiful, secure digital journal.

## 🌐 Live Demo

**🚀 [View Live Application](https://apeksha-journalapp.netlify.app/)**

![JournalApp Screenshot](https://sjc.microlink.io/IW_GVIk7dmBrUeGnzMVaEeKNqHnQ4PuIcCeFrktSw8F1PgmLernSzQPJ2G_D5MWmiOvxBLzucJSSqGlD7-EAeg.jpeg)

## ✨ Features

### 🔐 **Authentication & Security**
- Secure user registration and login
- Session management with automatic logout
- Password protection for all journal entries
- Authentication validation on all routes

### 📝 **Journal Management**
- Create, read, and delete personal journal entries
- Rich text content support
- Entry title and content organization
- Confirmation dialogs for destructive actions

### 🎨 **Beautiful User Interface**
- Journal-themed design with warm color palette
- Responsive layout for desktop and mobile
- Smooth animations and transitions
- Loading states and error handling
- Custom journal logo and branding

### 🔄 **User Experience**
- Intuitive navigation between pages
- Real-time form validation
- Success and error notifications
- Session timeout handling
- Seamless page transitions

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API communication
- **CSS3** - Custom styling with journal theme
- **JavaScript ES6+** - Modern JavaScript features

### **Backend**
- **Spring Boot** - Java framework for REST API
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **Hibernate** - Object-relational mapping
- **MySQL/H2** - Database management
- **Maven** - Dependency management

### **Deployment**
- **Frontend**: Netlify
- **Backend**: (Add your backend deployment platform)

## 📁 Project Structure

\`\`\`
JournalWebsite-Using-SpringBoot-React/
├── backend/                 # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/journal/
│   │   │   │       ├── controller/    # REST Controllers
│   │   │   │       ├── model/         # Entity Classes
│   │   │   │       ├── repository/    # Data Access Layer
│   │   │   │       ├── service/       # Business Logic
│   │   │   │       └── config/        # Configuration
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── static/
│   │   └── test/
│   ├── pom.xml
│   └── README.md
├── frontend/                # React Application
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js       # User authentication
│   │   │   ├── SignUp.js      # User registration
│   │   │   ├── JournalPage.js # Main journal interface
│   │   │   └── JournalLogo.js # App branding
│   │   ├── styles/
│   │   │   ├── login.css
│   │   │   ├── signup.css
│   │   │   └── journalpage.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md
\`\`\`

## 🚀 Getting Started

### **Prerequisites**
- **Java 11+** - For Spring Boot backend
- **Node.js 14+** - For React frontend
- **npm or yarn** - Package manager
- **MySQL** (optional, H2 can be used for development)
- **Git** - Version control

### **Backend Setup**

1. **Navigate to backend directory:**
   \`\`\`bash
   cd backend
   \`\`\`

2. **Configure database** (optional - uses H2 by default):
   ```properties
   # src/main/resources/application.properties
   spring.datasource.url=jdbc:mysql://localhost:3306/journaldb
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   \`\`\`

3. **Run the Spring Boot application:**
   \`\`\`bash
   ./mvnw spring-boot:run
   \`\`\`
   
   Backend will start on `http://localhost:8080`

### **Frontend Setup**

1. **Navigate to frontend directory:**
   \`\`\`bash
   cd frontend
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create environment file:**
   \`\`\`bash
   # Create .env file
   REACT_APP_API_URL=http://localhost:8080
   \`\`\`

4. **Start the development server:**
   \`\`\`bash
   npm start
   \`\`\`
   
   Frontend will start on `http://localhost:3000`

## 🔧 Development

### **Running Both Applications**

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
./mvnw spring-boot:run
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm start
\`\`\`

### **Building for Production**

**Backend:**
\`\`\`bash
cd backend
./mvnw clean package
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm run build
\`\`\`

## 🌐 API Endpoints

### **Authentication**
- `POST /user/find-user` - User login
- `POST /public/create-user` - User registration

### **Journal Operations**
- `GET /journal` - Get all user's journal entries
- `POST /journal` - Create new journal entry
- `GET /journal/id/{id}` - Get specific journal entry
- `DELETE /journal/id/{id}` - Delete journal entry

### **Request/Response Examples**

**User Login:**
\`\`\`json
POST /user/find-user
{
  "userName": "johndoe",
  "password": "securepassword"
}
\`\`\`

**Create Journal Entry:**
\`\`\`json
POST /journal
{
  "title": "My First Entry",
  "content": "Today was a wonderful day..."
}
\`\`\`

## 🎨 Design Features

- **Color Palette**: Warm amber and orange tones
- **Typography**: Crimson Text and Playfair Display fonts
- **Icons**: Journal-themed emojis and custom SVG
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

## 🔒 Security Features

- **Password Encryption**: Secure password hashing
- **Session Management**: Automatic session validation
- **Route Protection**: Authentication required for journal access
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Client and server-side validation

## 📱 Responsive Design

- **Desktop**: Full-featured layout with sidebar
- **Tablet**: Adapted layout for medium screens
- **Mobile**: Optimized for touch interactions
- **Progressive Web App**: Installable on mobile devices

## 🚀 Deployment

### **Frontend (Netlify)**
1. Build the React app: `npm run build`
2. Deploy `build` folder to Netlify
3. Configure environment variables in Netlify dashboard

### **Backend Options**
- **Heroku**: Easy Java deployment
- **AWS EC2**: Scalable cloud hosting
- **DigitalOcean**: Simple VPS deployment
- **Railway**: Modern deployment platform

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit your changes:**
   \`\`\`bash
   git commit -m 'Add some amazing feature'
   \`\`\`
4. **Push to the branch:**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open a Pull Request**

## 📋 Future Enhancements

- [ ] **Rich Text Editor** - Advanced formatting options
- [ ] **Image Upload** - Add photos to journal entries
- [ ] **Search Functionality** - Find entries by content
- [ ] **Categories/Tags** - Organize entries by topics
- [ ] **Export Options** - Download entries as PDF/Word
- [ ] **Dark Mode** - Alternative color scheme
- [ ] **Mobile App** - React Native version
- [ ] **Backup & Sync** - Cloud storage integration

## 🐛 Known Issues

- Date display removed (not stored in database)
- Session timeout needs user-friendly warning
- Mobile keyboard may cover input fields

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Apeksha Soni**
- GitHub: [@Apekshasoni06](https://github.com/Apekshasoni06)
- Email: apekshasoni56@gmail.com

**⭐ If you found this project helpful, please give it a star on GitHub!**

**🌐 [Live Demo](https://apeksha-journalapp.netlify.app/) | 📚 [Documentation](https://github.com/Apekshasoni06/JournalWebsite-Using-SpringBoot-React) | 🐛 [Report Bug](https://github.com/Apekshasoni06/JournalWebsite-Using-SpringBoot-React/issues)**
\`\`\`


