import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
// import submit from '../submit';
//Validate
import validate from './validate';
import asyncValidate from './asyncValidate';
import { CONTACT_FORM } from './FormNames';
import RemoteSubmitButton from './../containers/RemoteSubmitButton';
//Normalize = "Auto correct input"
import normalizePhone from './normalizePhoneNumber'
const normalizeUpper = value => value && value.toUpperCase();
const normalizeLower = value => value && value.toLowerCase();


const renderField = ({ label, keyboardType, placeholder, meta: { touched, error, warning, asyncValidating },
                                                        input: { onChange, onBlur, ...restInput }}) => {
    return (<View style={{ flexDirection: 'column', height: 70, alignItems: 'flex-start' }}>
        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', width: 80 }}>{label}</Text>
            <TextInput style={{ borderColor: 'steelblue', borderWidth: 1, height: 37, width: 220, padding: 5 }}
                keyboardType={keyboardType} onChangeText={onChange}
                onEndEditing={onBlur} {...restInput}
                placeholder={placeholder} autoCapitalize='none'
            >
            </TextInput>
        </View>
        {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange' }}>{warning}</Text>) ||
                (asyncValidating && <Text style={{ color: 'orange' }}>Validating...</Text>))}
    </View>);
};
const submit = values => {
    alert(`Validation success. Values = ~${JSON.stringify(values)}`);
}
const ContactComponent = props => {
    const { handleSubmit, submitting, reset } = props;

    return (
        <View style={{ flex: 1, flexDirection: 'column', margin: 40, justifyContent: 'flex-start', }}>
            <Field name="username" keyboardType="default" label="Username: " placeholder="Enter name(lowercase)" component={renderField}

            />
            <Field name="fullname" keyboardType="default" label="Fullname: " placeholder="Full name(uppercase)" component={renderField}
                normalize={normalizeUpper}
            />
            <Field name="email" keyboardType="email-address" label="Email: " placeholder="Enter email" component={renderField}
            />
            <Field name="phoneNumber" keyboardType="numeric" label="Phone(999.999.9999): " placeholder="Your phone number" component={renderField}
                normalize={normalizePhone}
            />
            <Field name="age" keyboardType="numeric" label="Age: " placeholder="Enter age" component={renderField}
            />
            <RemoteSubmitButton />
        </View>
    );
}
const ContactForm = reduxForm({
    form: CONTACT_FORM, // a unique identifier for this form
    validate,
    asyncValidate,
    asyncBlurFields: ['username', 'email'],
    onSubmit: submit
})(ContactComponent);

export default ContactForm;
