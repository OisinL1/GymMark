export const seedData = {
    users: {
        _model: "User",
        admin: {
            firstName: "Admin",
            lastName: "User",
            email: "admin@example.com",
            password: "adminsecret",
            isAdmin: true,
        },
        homer: {
            firstName: "Homer",
            lastName: "Simpson",
            email: "homer@simpson.com",
            password: "secret",
            isAdmin: false,
        },
        marge: {
            firstName: "Marge",
            lastName: "Simpson",
            email: "marge@simpson.com",
            password: "secret",
            isAdmin: false,
        },
        bart: {
            firstName: "Bart",
            lastName: "Simpson",
            email: "bart@simpson.com",
            password: "secret",
            isAdmin: false,
        },
    },
    gyms: {
        _model: "Gym",
        ymca: {
            title: "YMCA",
            description: "The community center offering a variety of fitness classes.",
            lat: 34.048,
            lng: -118.264,
            capacity: 350,
            category: "General Fitness",
            userid: "->users.admin"
        },
        crunchFitness: {
            title: "Crunch Fitness",
            description: "Affordable fitness center with a fun and welcoming atmosphere.",
            lat: 37.774,
            lng: -122.419,
            capacity: 500,
            category: "Cardio",
            userid: "->users.bart"
        },
        fitnessFactory: {
            title: "Fitness Factory",
            description: "A high-end gym focused on personal training and strength training.",
            lat: 39.952,
            lng: -75.163,
            capacity: 150,
            category: "Strongman",
            userid: "->users.homer"
        },
    },
};
