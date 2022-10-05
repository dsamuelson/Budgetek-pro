import moment from 'moment';

export function formatDate(datetime) {
    return moment(parseInt(datetime)).format('MMM DD YYYY');
}