import fetchConstructor from '@/utils/fecthConstructor';
import { IReferralLinkAttribute } from '../_interfaces';
import { RouteENUM } from '../../../../constants/data';

const putReferralLinkAttributeRepository = async ({
  id,
  body
}: {
  id?: string | null;
  body: IReferralLinkAttribute;
}) => {
  const res = await fetchConstructor<IReferralLinkAttribute, IReferralLinkAttribute>({
    method: 'put',
    path: RouteENUM.REFERRAL_LINK + 'pixel/' + id,
    body
  });

  return res.data;
};

export default putReferralLinkAttributeRepository;
