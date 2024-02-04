import { Session } from 'inspector';
import { CXN } from '../typeorm/dataSource';
import { UserMeta } from '../typeorm/entity/meta';
import { Role } from '../typeorm/entity/role';
import { User } from '../typeorm/entity/user';
import { ParkingEntity } from '../typeorm/entity/parkingEntity';
import { ParkingLocations } from '../typeorm/entity/parkingLocations';
import { Floor } from '../typeorm/entity/floors';
import { Section } from '../typeorm/entity/sections';
import { Spot } from '../typeorm/entity/spots';

// User Repository
export const UserRepository = CXN.getRepository<User>(User);

// UserMeta Repository
export const UserMetaRepository = CXN.getRepository<UserMeta>(UserMeta);

// Role Repository
export const RoleRepository = CXN.getRepository<Role>(Role);

// Session Repository
export const SessionRepository = CXN.getRepository<Session>(Session);

//Parling Repository
export const ParkingRepositry = CXN.getRepository<ParkingEntity>(ParkingEntity);

//Location Repository
export const LocationRepositry = CXN.getRepository<ParkingLocations>(ParkingLocations);

//Floors Repository
export const FloorRepositry = CXN.getRepository<Floor>(Floor);

//Sections Repository
export const SectionRepositry = CXN.getRepository<Section>(Section);

//Spots Repository
export const SpotsRepositry = CXN.getRepository<Spot>(Spot);
