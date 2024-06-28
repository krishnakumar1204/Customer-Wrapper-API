import axios from "axios";

const url = "https://north-america.api.capillarytech.com/v2/customers";

export async function addCustomer(req, res) {

    const accessToken = req.headers['x-cap-api-oauth-token'];
    const data = req.body;

    const firstName = data.firstName;
    const lastName = data.lastName;
    const identifiers = data.attributeSets[0].customerIdentifiers.filter((identifier) => identifier.type === "email" || identifier.type === "externalId");
    const source = data.source || "INSTORE";

    const customerInfo = {
        profiles: [
            {
                firstName: firstName,
                lastName: lastName,
                identifiers: identifiers,
                source: source
            }
        ]
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            "X-CAP-API-OAUTH-TOKEN": accessToken,
        },
    }

    try {
        const responseData = await axios.post(url, customerInfo, config);
        if (responseData.data.createdId) {
            const customerId = responseData.data.createdId;
            const getUrl = `${url}/${customerId}?source=${source}`;
            const customerDetails = await axios.get(getUrl, config);
            customerDetails.data.warnings = [...customerDetails.data.warnings, ...responseData.data.warnings];
            return res.status(200).json(customerDetails.data);
        }
        res.status(200).json(responseData.data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function getCustomerDetails(req, res) {

    const customerId = req.params.customerId;
    const source = req.query.source;
    const getUrl = `${url}/${customerId}?source=${source}`;
    const accessToken = req.headers['x-cap-api-oauth-token'];

    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CAP-API-OAUTH-TOKEN": accessToken,
        },
    }

    try {
        const responseData = await axios.get(getUrl, config);
        res.status(200).json(responseData.data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}