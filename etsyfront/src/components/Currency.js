import React from 'react'
import { FormattedNumber, IntlProvider } from 'react-intl';

const Currency = (props) => {
    const currency = props.currency;
    const minimum = props.minimumFractionDigits || 2;
    const maximum = props.maximumFractionDigits || 2;
    return (
        <IntlProvider locale='en'>
            <FormattedNumber
                value={props.amount}
                style="currency"
                currency={currency}
                minimumFractionDigits={minimum}
                maximumFractionDigits={maximum}
            />
        </IntlProvider>
    )
}

export default Currency