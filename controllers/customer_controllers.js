import axios from "axios";

const url = "https://north-america.api.capillarytech.com/v2/customers";

export async function addCustomer(req, res) {

    const accessToken = req.headers['x-cap-api-oauth-token'];
    const data = req.body;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            "X-CAP-API-OAUTH-TOKEN": accessToken,
        },
    }

    try {
        const responseData = await axios.post(url, data, config);
        res.status(200).json({ msg: responseData.data });

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