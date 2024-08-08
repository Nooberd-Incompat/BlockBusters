import Head from 'next/head';
import { SetStateAction, useState } from 'react';
import { Form, Input, Select, DatePicker, Upload, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { PhoneOutlined } from '@ant-design/icons';
import { PhoneFilled } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';

const PatientProfile = () => {
  const [patientData, setPatientData] = useState({
    personalInformation: {
      patientID: '',
      name: '',
      dateOfBirth: '',
      gender: '',
      contactInformation: {
        email: '',
        phone: '',
      },
    },
    medicalInformation: {
      diseaseName: '',
      diagnosisDate: '',
      geneticInformation: '',
      symptoms: '',
      treatmentHistory: '',
      currentMedications: [],
    },
    healthRecords: {
      medicalHistory: '',
      allergies: '',
      immunizationRecords: '',
    },
    consentAndPrivacy: {
      dataSharingPreferences: '',
      consentForms: '',
    },
    userAuthenticationAndSecurity: {
      profileAccessControls: '',
      twoFactorAuthentication: '',
    },
    engagementAndInteraction: {
      researchInterests: '',
      patientAdvocacy: '',
    },
    miscellaneous: {
      medicalRecordsUpload: '',
      notesAndObservations: '',
    },
  });

  const [form] = Form.useForm();

  const handleFormChange = (values: SetStateAction<{ personalInformation: { patientID: string; name: string; dateOfBirth: string; gender: string; contactInformation: { email: string; phone: string; }; }; medicalInformation: { diseaseName: string; diagnosisDate: string; geneticInformation: string; symptoms: string; treatmentHistory: string; currentMedications: never[]; }; healthRecords: { medicalHistory: string; allergies: string; immunizationRecords: string; }; consentAndPrivacy: { dataSharingPreferences: string; consentForms: string; }; userAuthenticationAndSecurity: { profileAccessControls: string; twoFactorAuthentication: string; }; engagementAndInteraction: { researchInterests: string; patientAdvocacy: string; }; miscellaneous: { medicalRecordsUpload: string; notesAndObservations: string; }; }>) => {
    setPatientData({ ...patientData, ...values });
  };

  const handleFormSubmit = () => {
    // Submit patient data to API or database
    const submitPatientData = async () => {
      const response = await fetch('/api/patient-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      });
      const data = await response.json();
      console.log(data);
    };
    submitPatientData();
  };

  return (
    <div>
      <Head>
        <title>Patient Profile</title>
      </Head>
      <h1>Patient Profile</h1>
      <Form
        form={form}
        layout="vertical"
        initialValues={patientData}
        onValuesChange={handleFormChange}
        onFinish={handleFormSubmit}
      >
        {/* Personal Information */}
        <Form.Item label="Patient ID" name={['personalInformation', 'patientID']}>
          <Input />
        </Form.Item>
        <Form.Item label="Name" name={['personalInformation', 'name']}>
          <Input />
        </Form.Item>
        <Form.Item label="Date of Birth" name={['personalInformation', 'dateOfBirth']}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Gender" name={['personalInformation', 'gender']}>
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Contact Information" name={['personalInformation', 'contactInformation']}>
          <Input.Group>
            <Input addonBefore={<MailOutlined />} type="email" />
            <Input addonBefore={<PhoneOutlined />} type="phone" />
          </Input.Group>
        </Form.Item>

        {/* Medical Information */}
        <Form.Item label="Disease Name" name={['medicalInformation', 'diseaseName']}>
          <Input />
        </Form.Item>
        <Form.Item label="Diagnosis Date" name={['medicalInformation', 'diagnosisDate']}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Genetic Information" name={['medicalInformation', 'geneticInformation']}>
          <Input />
        </Form.Item>
        <Form.Item label="Symptoms" name={['medicalInformation', 'symptoms']}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Treatment History" name={['medicalInformation', 'treatmentHistory']}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Current Medications" name={['medicalInformation', 'currentMedications']}>
          <Select mode="multiple">
            <Select.Option value="medication1">Medication 1</Select.Option>
            <Select.Option value="medication2">Medication 2</Select.Option>
            <Select.Option value="medication3">Medication 3</Select.Option>
          </Select>
        </Form.Item>

        {/* Health Records */}
        <Form.Item label="Medical History" name={['healthRecords', 'medicalHistory']}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Allergies" name={['healthRecords', 'allergies']}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Immunization Records" name={['healthRecords', 'immunizationRecords']}>
          <Input.TextArea />
        </Form.Item>

        {/* Consent & Privacy */}
        <Form.Item label="Data Sharing Preferences" name={['consentAndPrivacy', 'dataSharingPreferences']}>
          <Select>
            <Select.Option value="public">Public</Select.Option>
            <Select.Option value="private">Private</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Consent Forms" name={['consentAndPrivacy', 'consentForms']}>
          <Input.TextArea />
        </Form.Item>

        {/* User Authentication & Security */}
        <Form.Item label="Profile Access Controls" name={['userAuthenticationAndSecurity', 'profileAccessControls']}>
          <Select>
            <Select.Option value="public">Public</Select.Option>
            <Select.Option value="private">Private</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Two-Factor Authentication" name={['userAuthenticationAndSecurity', 'twoFactorAuthentication']}>
          <Select>
            <Select.Option value="enabled">Enabled</Select.Option>
            <Select.Option value="disabled">Disabled</Select.Option>
          </Select>
        </Form.Item>

        {/* Engagement & Interaction */}
        <Form.Item label="Research Interests" name={['engagementAndInteraction', 'researchInterests']}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Patient Advocacy" name={['engagementAndInteraction', 'patientAdvocacy']}>
          <Input.TextArea />
        </Form.Item>

        {/* Miscellaneous */}
        <Form.Item label="Medical Records Upload" name={['miscellaneous', 'medicalRecordsUpload']}>
          <Upload>
            <Button>
              <UploadOutlined />
              Upload Medical Records
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Notes and Observations" name={['miscellaneous', 'notesAndObservations']}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PatientProfile;