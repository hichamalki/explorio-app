import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    col: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    mt10: {
        marginTop: 10
    },
    mt20: {
        marginTop: 20
    },
    mt30: {
        marginTop: 30
    },
    mt50: {
        marginTop: 50
    },
    iosHeader: {
        ...(Platform.OS === 'ios' && { paddingTop: 50 })
    },
    scrollView: {
        // paddingBottom: 50
    }
});