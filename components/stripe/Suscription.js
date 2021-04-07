import React, { useState } from 'react';
import axios from 'axios';
// MUI Components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CircularProgress } from "@material-ui/core"

// stripe
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// Util imports
import { makeStyles } from '@material-ui/core/styles';
// Custom Components
import CardInput from './CardInput';
import { Sidebar } from "../app"
const useStyles = makeStyles({
    root: {
        margin: ' auto',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
    },
});


function Suscription({ id_price, verifypay }) {
    const classes = useStyles();
    // State
    const [Spinner, setSpinner] = useState(false)
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitSub = async () => {
        setSpinner(true)
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: "test@test.com",
            },
        });
        if (result.error) {
            console.log(result.error.message);
        } else {
            const res = await axios.post('http://localhost:3001/sub', { 'payment_method': result.paymentMethod.id, 'email': "test@test.com", id: id_price });
            // eslint-disable-next-line camelcase
            const { client_secret, status } = res.data;
            console.log(res.data)
            if (status === 'requires_action') {
                stripe.confirmCardPayment(client_secret).then(function (result) {
                    if (result.error) {
                        verifypay(false)

                        console.log('There was an issue!');
                        console.log(result.error);
                        // Display error message in your UI.
                        // The card was declined (i.e. insufficient funds, card has expired, etc)
                    } else {
                        setSpinner(false)
                        verifypay(true)
                        console.log('You got the money!');
                        // Show a success message to your customer
                    }
                });
            } else {
                setSpinner(false)
                verifypay(true)
                console.log('You got the money!');
                // No additional information was needed
                // Show a success message to your customer
            }
        }
    };

    return (

        <Card className={classes.root, `w-full`}>
            <CardContent className={classes.content}>
                <CardInput />
                <div className={"m-auto text-center mt-3"}>

                    {
                        Spinner ? (<CircularProgress />) : (<Button variant="contained" color="primary" className={`bg-blue-700 m-auto mt-3`} onClick={handleSubmitSub}> Suscribirse </Button>)
                    }

                </div>


            </CardContent>
        </Card>

    );
}

export default Suscription;