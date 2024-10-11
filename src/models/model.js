import db from "../config/db.js";

export const getAllLeads = async () => {
    const client = await db.connect();
    try {
        const result = await client.query('SELECT * FROM leads');
        return result.rows;
    } catch (error) {
        console.error("Error fetching leads:", error.message || error);
        throw new Error("Could not fetch leads, please try again later.");
    } finally {
        client.release();
    }
};

export const getLeadByID = async (id) => {
    const client = await db.connect();
    try {
        const result = await client.query('SELECT * FROM leads WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error("Lead not found");
        }
        return result.rows[0];
    } catch (error) {
        console.error(`Error fetching lead with ID ${id}:`, error.message || error);
        throw new Error("Could not fetch the lead, please try again later.");
    } finally {
        client.release();
    }
};

export const postRegister = async (name, email, mobile, postcode, services) => {
    const client = await db.connect();
    try {
        const result = await client.query(
            'INSERT INTO leads (name, email, mobile, postcode, services) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, mobile, postcode, JSON.stringify(services)]
        );
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error during lead registration:", error.message || error);
        throw new Error("Could not register lead, please try again later.");
    } finally {
        client.release();
    }
};


export const checkEmail = async (email) => {
    const client = await db.connect();
    try {
        const result = await client.query('SELECT COUNT(*) FROM leads WHERE email = $1', [email]);
        return result.rows[0].count > 0;
    } catch (error) {
        console.error("Error checking email existence:", error.message || error);
        throw new Error("Could not check email, please try again later.");
    } finally {
        client.release();
    }
};