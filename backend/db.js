const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'wellness.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        db.serialize(() => {
            // Users table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                course TEXT,
                year TEXT,
                status TEXT DEFAULT 'Active',
                role TEXT DEFAULT 'student'
            )`);
            
            // Programs table
            db.run(`CREATE TABLE IF NOT EXISTS programs (
                id TEXT PRIMARY KEY,
                category TEXT,
                metric TEXT,
                title TEXT,
                description TEXT,
                details TEXT
            )`);
            
            // Enrollments table
            db.run(`CREATE TABLE IF NOT EXISTS enrollments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                program_id TEXT,
                enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id),
                FOREIGN KEY(program_id) REFERENCES programs(id)
            )`);
            
            // Support requests table
            db.run(`CREATE TABLE IF NOT EXISTS support_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                name TEXT,
                email TEXT,
                topic TEXT,
                message TEXT,
                status TEXT DEFAULT 'Pending',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )`);

            // Check if programs exist, if not insert default programs
            db.get("SELECT COUNT(*) AS count FROM programs", (err, row) => {
                if (row.count === 0) {
                    console.log("Seeding initial programs...");
                    const stmt = db.prepare("INSERT INTO programs (id, category, metric, title, description, details) VALUES (?, ?, ?, ?, ?, ?)");
                    
                    const programsData = [
                        {
                            id: "restore-yoga",
                            category: "Recovery",
                            metric: "Mon and Wed",
                            title: "Restore yoga",
                            description: "Gentle mobility and breath-led practice to help students decompress after long academic days.",
                            details: JSON.stringify(["Beginner friendly", "45 minute session", "Studio and virtual"])
                        },
                        {
                            id: "strength-lab",
                            category: "Performance",
                            metric: "Tue and Thu",
                            title: "Strength lab",
                            description: "Progressive strength blocks focused on posture, energy, and consistency rather than intimidation.",
                            details: JSON.stringify(["Coach guided", "60 minute session", "Small groups"])
                        },
                        {
                            id: "focus-reset",
                            category: "Mindset",
                            metric: "Daily drop-in",
                            title: "Focus reset meditation",
                            description: "Short guided practices that reduce overwhelm and make it easier to return to deep work.",
                            details: JSON.stringify(["10 minute format", "No equipment", "Morning and evening"])
                        }
                    ];

                    programsData.forEach(p => {
                        stmt.run(p.id, p.category, p.metric, p.title, p.description, p.details);
                    });
                    stmt.finalize();
                }
            });
        });
    }
});

module.exports = db;
