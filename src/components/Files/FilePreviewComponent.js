import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ProgressBarAndroid,
    ProgressViewIOS,
    Platform
} from 'react-native';
import React, { Component } from 'react';
import { getDeviceWidth, getDeviceHeight, getWidth, getHeight } from '../../utils/adaptive';
import { getShortBucketName, getFileNameWithFixedSize } from "../../utils/fileUtils";
import ActionBar from '../ActionBarComponent';
import SelectBucketComponent from '../Buckets/SelectBucketComponent';
import DetailedInfoComponent from './DetailedInfoComponent';
import Button from "../Common/ButtonComponent";

export default class FilePreviewComponent extends Component {

    //Pass uri through screen props
    constructor(props) {
        super(props);

        this.state = {
            isSelectBucketShown: false,
            isDetailedInfoShown: false
        };

        this.showSelectBuckets = this.showSelectBuckets.bind(this);
        this.showDetailedInfo = this.showDetailedInfo.bind(this);
        this.onPress = this.onPress.bind(this);
        this.onShare = this.onShare.bind(this);
        this.emptyFunction = () => {};
    }

    onPress(bucket) {
        this.selectBucketCallback({ bucketId: bucket.getId() });
    }

    async onShare() {
        await this.props.onShare(this.props.fileUri.uri);
    }

    showSelectBuckets(callback) {
        if(callback) {
            this.selectBucketCallback = callback;
        }
        
        this.setState({ isSelectBucketShown: !this.state.isSelectBucketShown })
    }

    showDetailedInfo() {
        this.setState({ isDetailedInfoShown: !this.state.isDetailedInfoShown })
    }

    render() {
        const starredIcon = this.props.isStarred ? '★' : null;
        let { name, extention } = this.props.name ? getFileNameWithFixedSize(this.props.name, 20) : { name: null, extention: null };

        return(
            <TouchableWithoutFeedback style = { backgroundColor = "transparent" } onPress = { this.props.showActionBar ? this.props.onOptionsPress : null }>
                <View style = { styles.mainContainer} >
                    <View style = { [ styles.backgroundWrapper, { opacity: 0.93 } ] } />
                    <View style = { styles.centralContainer }>
                        <Image source = { require('../../images/Icons/CloudFile.png') } style = { styles.cloudImage } />
                        <Text style = { styles.text }>
                        <Text style = { styles.blueStar }>
                            { starredIcon }
                        </Text>
                        <Text style = { styles.boldText }>
                            { name }
                        </Text>
                        { extention }</Text>
                        <Text style = { styles.text }>{ this.props.size }</Text>
                    </View>
                    {
                        !this.props.showProgress || this.props.isDownloaded ? 
                            null :
                            Platform.select({
                                ios: 
                                    <ProgressViewIOS 
                                        progress = { this.props.progress }
                                        trackTintColor = { '#f2f2f2' }
                                        progressTintColor = { '#2794ff' } />,
                                android:
                                    <ProgressBarAndroid    
                                        progress = { this.props.progress } 
                                        styleAttr = { 'Horizontal' } 
                                        color = { '#2794FF' } 
                                        animating = {true} 
                                        indeterminate = { false } />
                            }) 
                    }
                    <View style = { [ styles.buttonWrapper, styles.topButtonsWrapper ] }>
                        <View style = { styles.backgroundWrapper } />
                        <Button 
                            onPress = { this.props.onBackPress }
                            source = { require("../../images/Icons/BackButton.png") } />
                        <View style = { styles.flexRow }>
                            <Button 
                                onPress = { this.showDetailedInfo }
                                source = { require("../../images/Icons/BlueInfo.png") } />
                            <Button 
                                onPress = { this.props.onOptionsPress }
                                source = { require("../../images/Icons/SearchOptions.png") } />
                        </View>
                    </View>
                    <View style = { [ styles.buttonWrapper, styles.bottomButtonWrapper ] }>
                        {
                            this.props.showActionBar ? 
                                null :
                                <View style = { styles.backgroundWrapper } />      
                        }
                        {
                            this.props.showActionBar ? 
                                <ActionBar 
                                    actions = { this.props.actionBarActions } /> :
                                <Button
                                    onPress = { this.onShare }
                                    source = { require("../../images/Icons/BlueShare.png") } />
                        }
                    </View>
                    {
                        this.state.isSelectBucketShown  
                            ? <SelectBucketComponent
                                getItemSize = { this.emptyFunction }
                                isLoading = { false }
                                searchSubSequence = { null }
                                sortingMode = { null }
                                onRefresh = { this.emptyFunction }
                                isGridViewShown = { this.props.isGridViewShown }
                                onPress = { this.onPress }
                                onLongPress = { this.emptyFunction }
                                onDotsPress = { this.emptyFunction }
                                onCancelPress = { this.emptyFunction }
                                selectedItemId = { null }
                                isSelectionMode = { false }
                                data = { this.props.buckets }
                                getBucketName = { getShortBucketName }
                                
                                showOptions = { this.emptyFunction }
                                navigateBack = { this.showSelectBuckets } />
                            : null
                    }
                    {
                        this.state.isDetailedInfoShown 
                            ? <DetailedInfoComponent
                                showDetailedInfo = { this.showDetailedInfo }
                                fileName = { this.props.name }
                                type = { this.props.mimeType }
                                size = { this.props.size }
                                creationDate = { this.props.created }
                                isStarred = { this.props.isStarred } /> : null
                    }
                </View>
            </TouchableWithoutFeedback>   
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: getWidth(20)
    },
    buttonWrapper: {
        position: "absolute",
        left: 0,
        right: 0,
        height: getHeight(72),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: getWidth(10)
    },
    topButtonsWrapper: {
        top: 0,
        justifyContent: 'space-between'
    },
    bottomButtonWrapper: {
        bottom: 0
    },
    image: {
        backgroundColor: "transparent",
        width: getDeviceWidth(),
        height: getDeviceHeight()
    },
    backgroundWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        opacity: 0.5
    },
    loadingComponentContainer: {
        backgroundColor: 'transparent',
        position: "absolute",
        left: 0,
        right: 0,
        top: getHeight(80),
        height: getHeight(60)
    },
    centralContainer: {
        alignSelf: 'center',
        width: getWidth(300),
        alignItems: 'center'
    },
    cloudImage: {
        height: getHeight(124),
        width: getWidth(103)
    },
    icon: {
        height: getHeight(24),
        width: getWidth(24)
    }, 
    text: {
        fontFamily: 'montserrat_regular', 
        fontSize: getHeight(18), 
        color: 'rgba(56, 75, 101, 0.4)'
    },
    boldText: {
        fontFamily: 'montserrat_semibold', 
        fontSize: getHeight(18), 
        color: '#384B65'
    },
    flexRow: {
        flexDirection: 'row'
    },
    searchButtonMargin: {
        marginLeft: getWidth(20)
    },
    blueStar: {
        fontSize: getHeight(16),
        color: '#2794FF'
    }
});