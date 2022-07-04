import React, { useContext, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, Input, Text, CheckBox } from '@rneui/base';
import DateTimePicker from '@react-native-community/datetimepicker'; //installation required
import { AssetEntryContext } from '../../contexts/Contexts';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AssetEntry } from '../../entities/asset-entry.entity';
import moment from 'moment';

/**
 * Type for state variable for the form
 */
type IState = {
    id: number,
    txnDay: number | null;
    txnMonth: number | null;
    txnYear: number | null;
    date: Date;
    description: string;
    asset: string;
    acquired: boolean
}

const EditEntry: React.FC = () => {

    const { updateEntry } = useContext(AssetEntryContext)!;

    //const route = useRoute();
    //below is the right declaration for TypeScript but looks complicated.
    const route = useRoute<RouteProp<Record<string, { assetEntryToEdit: AssetEntry }>>>();
    const assetEntryToEdit = route.params.assetEntryToEdit;

    const navigation = useNavigation();

    const date = new Date(); // for initializing all the dates.
    const [state, setState] = useState<IState>({
        id: assetEntryToEdit.id,
        txnDay: assetEntryToEdit.txnDay,
        txnMonth: assetEntryToEdit.txnMonth,
        txnYear: assetEntryToEdit.txnYear,
        date: new Date(assetEntryToEdit.txnYear,assetEntryToEdit.txnMonth,assetEntryToEdit.txnDay),
        description: assetEntryToEdit.description,
        asset: assetEntryToEdit.asset,
        acquired: assetEntryToEdit.acquired?true:false
    })

    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios" ? true : false);

    return (
        <View style={styles.container}>
            <Text h3 style={styles.inputContainerStyle}>Edit displayed values</Text>
            {/* Only show button below if the OS is not ios. IOS DateTimePicker is visible by default */}
            <View style={[styles.inputContainerStyle, { flexDirection: 'row', alignSelf: 'flex-start' }]}>
                {Platform.OS !== "ios" && <Button
                    radius={6}
                    title={moment(state.date).format("LL")}
                    onPress={() => {
                        setShowDatePicker(true);
                    }}
                />}
                {showDatePicker && <DateTimePicker
                    style={styles.inputContainerStyle}
                    value={state.date}
                    mode={'date'}
                    //is24Hour={true}
                    display="default"
                    onChange={(_event: any, selectedDate: any) => {
                        const date: Date = selectedDate as Date;
                        setState({
                            ...state,
                            date: selectedDate,
                            txnDay: date.getDate(),
                            txnMonth: date.getMonth(),
                            txnYear: date.getFullYear()
                        })
                        setShowDatePicker(Platform.OS === "ios" ? true : false);
                    }}
                />}
            </View>
            <CheckBox
                title='Income?'
                containerStyle={[styles.inputContainerStyle, { marginTop: 10, borderColor: '#fffff2' }]}
                checked={!state.acquired}
                onPress={() => { setState({ ...state, acquired: !state.acquired }) }}
            />
            <Input
                label="Description"
                value={state.description}
                placeholder="Enter brief asset description here"
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={description => setState({ ...state, description })}
                style={styles.inputStyle}
            />
            <Input
                label="asset"
                value={state.asset.toString()}
                placeholder="Enter asset here"
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={{ type: 'font-awesome', name: 'money' }}
                onChangeText={asset => setState({ ...state, asset })}
                style={styles.inputStyle}
            />

            <View style={{ flexDirection: 'row' }}>
                <Button style={[styles.inputContainerStyle, { paddingRight: 1 }]}
                    title="Save"
                    onPress={() => {
                        //call create which will also make the form disappear
                        //remove date before sending because it is not in the AssetEntry table. Only the breakdown day, month, year are there
                        const {date, ...updatedAssetEntryData} = state;
                        updateEntry(updatedAssetEntryData, navigation);
                    }}
                /><Button style={[styles.inputContainerStyle, { paddingLeft: 1 }]}
                    title="Cancel"
                    onPress={() => {
                        //call create which will also make the form disappear
                        navigation.goBack();
                    }}
                    buttonStyle={{ backgroundColor: 'orange' }}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffff2',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 18
    },
    inputContainerStyle: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fffff2'
    },
    inputStyle: {
        backgroundColor: '#F2F3F5',
        borderRadius: 6,
        height: '100%',
        padding: 6
    }
});

export default EditEntry;